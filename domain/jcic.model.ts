import { Firestore, Query, QuerySnapshot, CollectionReference, DocumentData, AggregateField, } from 'firebase-admin/firestore'
import SelectModel from './select.model'
import { LocationModel } from './location.model'

interface IPriceTableRawItem {
    '縣市名稱': string;
    '鄉鎮市區名稱': string;
    '買賣契約年季': string;
    '建物類別': string;
    '契約單價[萬元/坪]': string;
    '建坪[坪]': string;
    '屋齡[年]': string;
    '含車位價格': string;
}

interface IPriceTableItem {
    county?: string,
    town?: string,
    contractYear?: string,
    buildingType?: string,
    unitPrice?: number,
    floorSize?: string,
    buildingAge?: string,
    hasParking?: boolean,
}

interface IInit {
    selectModel: SelectModel
    locationModel: LocationModel
    firestore: Firestore
}

export default class EstateContractsModel {
    selectModel: SelectModel = null as any
    locationModel: LocationModel = null as any
    collectionContracts: CollectionReference = null as any
    initialize(payload: IInit) {
        this.selectModel = payload.selectModel
        this.locationModel = payload.locationModel
        this.collectionContracts = payload.firestore.collection('jcicContracts')
    }
    async calculateUnitPrice(query: IPriceTableItem) {
        let contractQuery: Query = this.collectionContracts
        if (query.county) {
            let countyLabel = this.locationModel.getCountyLabel(query.county)
            contractQuery = contractQuery.where('county', '==', countyLabel)
            if (query.town) {
                const townLabel = this.locationModel.getTownLabel(query.county, query.town)
                if (townLabel) {
                    contractQuery = contractQuery.where('town', '==', townLabel)
                }
            }
        }
        if (query.buildingAge) {
            contractQuery = contractQuery.where('buildingAge', '==', query.buildingAge)
        }
        if (query.buildingType) {
            contractQuery = contractQuery.where('buildingType', '==', query.buildingType)
        }
        if (typeof query.hasParking === 'boolean') {
            contractQuery = contractQuery.where('hasParking', '==', query.hasParking)
        }

        const orderedQuery = contractQuery.orderBy('unitPrice', 'asc')
        const countData: DocumentData = await orderedQuery.count().get()
        const count: number = countData.data().count

        let pr25: number = 0
        let pr75: number = 0
        let average: number = 0

        if (count && count >= 4) {
            const pr25Index: number = Math.floor(count / 4)
            const pr25Snapshot: QuerySnapshot = await orderedQuery.offset(pr25Index).limit(1).get()
            const pr25DocData: IPriceTableItem = pr25Snapshot.docs[0].data()
            pr25 = pr25DocData.unitPrice || 0

            const pr75Index: number = Math.floor(count / 4 * 3)
            const pr75Snapshot: QuerySnapshot = await orderedQuery.offset(pr75Index).limit(1).get()
            const pr75DocData: IPriceTableItem = pr75Snapshot.docs[0].data()
            pr75 = pr75DocData.unitPrice || 0

            const averageAggregateQuery = orderedQuery.aggregate({
                averageUnitPrice: AggregateField.average('unitPrice'),
            });
            const averageSnapshot = await averageAggregateQuery.get();
            const averageDocData = averageSnapshot.data()
            average = Number(Number(averageDocData.averageUnitPrice).toFixed(2)) || 0
        }

        return {
            count,
            pr25,
            pr75,
            average
        }
    }
    async getMortgageLocation() {
        let resultData = []
        try {
            resultData = require('./ContractPrice_TABLE_C_2023')
            if (!resultData) {
                const result = await fetch('https://www.jcic.org.tw/openapi/api/ContractPriceTableC2023', {
                    signal: AbortSignal.timeout(300)
                })
                const resultJson = await result.json()
                resultData = resultJson
            }
        } catch (error: any) {
            console.log(`getMortgageLocation`, error.message || error)
            throw error
        }
    }
    async getContractPriceTable() {
        let resultData = []
        try {
            resultData = require('./ContractPrice_TABLE_C_2023')
            if (!resultData) {
                const result = await fetch('https://www.jcic.org.tw/openapi/api/ContractPriceTableC2023', {
                    signal: AbortSignal.timeout(300)
                })
                const resultJson = await result.json()
                resultData = resultJson
            }
        } catch (error: any) {
            console.log(`getContractPriceTable`, error.message || error)
            throw error
        }

        const countData: DocumentData = await this.collectionContracts.count().get()
        const count: number = countData.data().count
        const contractPriceTableRawItems: IPriceTableRawItem[] = resultData
        const contractPriceTableItems: IPriceTableItem[] = contractPriceTableRawItems.slice(count, contractPriceTableRawItems.length).map(item => {
            const county = item['縣市名稱']
            const traditionCounty = county.replace('台', '臺')
            const booleanMap: { [key: string]: boolean } = {
                '無': false,
                '有': true,
            }
            return {
                'county': traditionCounty,
                'town': item['鄉鎮市區名稱'],
                'contractYear': item['買賣契約年季'],
                'buildingType': item['建物類別'],
                'unitPrice': Number(item['契約單價[萬元/坪]']),
                'floorSize': item['建坪[坪]'],
                'buildingAge': item['屋齡[年]'],
                'hasParking': booleanMap[item['含車位價格']],
            }
        })
        let index = 0
        setInterval(async () => {
            const item = contractPriceTableItems[index++]
            await this.collectionContracts.add(item)
            console.log(`total ${contractPriceTableItems.length}, ${index} added.`)
        }, 100)
    }
}