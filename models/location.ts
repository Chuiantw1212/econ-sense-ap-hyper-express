import axios from 'axios'
import { Firestore, CollectionReference, DocumentSnapshot, DocumentData } from 'firebase-admin/firestore'
import type { IOptionsItem, ICounty, ITown, ISelectMap, } from '../types/select'
const { XMLParser, } = require("fast-xml-parser");

export class LocationModel {
    counties: IOptionsItem[] = []
    townMap: ISelectMap = {}
    collection: CollectionReference = null as any
    async initializeSync(firestore: Firestore) {
        this.collection = firestore.collection('locations')
        await this.setCountiesAndTowns()
    }
    getTownLabel(countyValue: string, townValue: string) {
        const matchedItem = this.townMap[countyValue].find(item => item.value === townValue)
        return matchedItem?.label
    }
    getCountyLabel(countyValue: string) {
        const matchedItem = this.counties.find(item => item.value === countyValue)
        return matchedItem?.label
    }
    async fetchCountiesAndTowns() {
        // Set counties from https://data.gov.tw/dataset/101905
        const result = await axios.get('https://api.nlsc.gov.tw/other/ListCounty')
        const parser = new XMLParser();
        const jsonResult = parser.parse(result.data);
        const countyItems = jsonResult.countyItems.countyItem
        this.counties = countyItems.map((item: ICounty) => {
            return {
                value: item.countycode,
                label: item.countyname,
            }
        })
        // Set townMap from https://data.gov.tw/dataset/102011
        const promises = this.counties.map((county: IOptionsItem) => {
            const promise = axios.get(`https://api.nlsc.gov.tw/other/ListTown1/${county.value}`)
            return promise
        })
        const townResults = await Promise.all(promises)
        this.counties.forEach((county: IOptionsItem, index) => {
            this.townMap[county.value] = townResults[index].data.map((item: ITown) => {
                return {
                    label: item.townname,
                    value: item.towncode,
                }
            })
        })
    }
    async getCountiesAndTowns() {
        if (!this.counties.length) {
            await this.setCountiesAndTowns()
        }
        return {
            counties: this.counties,
            townMap: this.townMap
        }
    }
    async setCountiesAndTowns() {
        const snapshots = await this.collection.orderBy('key').get()
        const promises = snapshots.docs.map((doc: DocumentSnapshot) => {
            return doc.data() || {}
        })
        const items: DocumentData[] = await Promise.all(promises)
        items.forEach((item: DocumentData) => {
            if (item.key === 'TW') {
                this.counties = item.options
            } else {
                this.townMap[item.key] = item.options
            }
        })
    }
    async putAllItems(selectMap: ISelectMap) {
        try {
            const snapshots = await this.collection.get()
            const promises = snapshots.docs.map((doc: DocumentSnapshot) => {
                return this.collection.doc(doc.id).delete()
            })
            await Promise.all(promises)
            for (let key in selectMap) {
                const options = selectMap[key]
                await this.collection.add({
                    key,
                    options
                })
            }
        } catch (error) {
            throw error
        }
    }
}
const locationModel = new LocationModel()
export default locationModel