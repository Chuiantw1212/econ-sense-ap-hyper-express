import { Firestore, CollectionReference, DocumentSnapshot, DocumentData } from 'firebase-admin/firestore'
import type { IOptionsItem, ICounty, ITown, ISelectMap, } from '../entities/select.js'
import { XMLParser } from 'fast-xml-parser'

export default class LocationModel {
    counties: IOptionsItem[] = []
    townMap: ISelectMap = {}
    collection: CollectionReference = null as any
    constructor(firestore: Firestore) {
        this.collection = firestore.collection('locations')
    }
    async getTownLabel(countyValue: string, townValue: string) {
        if (!this.counties.length) {
            await this.setCountiesAndTowns()
        }
        const matchedItem = this.townMap[countyValue].find(item => item.value === townValue)
        return matchedItem?.label
    }
    async getCountyLabel(countyValue: string) {
        if (!this.counties.length) {
            await this.setCountiesAndTowns()
        }
        const matchedItem = this.counties.find(item => item.value === countyValue)
        return matchedItem?.label
    }
    async fetchCountiesAndTowns() {
        const parser = new XMLParser();
        // Set counties from https://data.gov.tw/dataset/101905
        const result = await fetch('https://api.nlsc.gov.tw/other/ListCounty', {
            signal: AbortSignal.timeout(300)
        })
        const resultText = await result.text()
        const jsonResult = parser.parse(resultText);
        const countyItems = jsonResult.countyItems.countyItem
        this.counties = countyItems.map((item: ICounty) => {
            return {
                value: item.countycode,
                label: item.countyname,
            }
        })
        // Set townMap from https://data.gov.tw/dataset/102011
        const promises = this.counties.map(async (county: IOptionsItem) => {
            const promise = await fetch(`https://api.nlsc.gov.tw/other/ListTown1/${county.value}`, {
                signal: AbortSignal.timeout(300)
            })
            const promiseText = await promise.text()
            const jsonResult = parser.parse(promiseText).townItems.townItem
            return jsonResult
        })
        const townResults = await Promise.all(promises)
        this.counties.forEach((county: IOptionsItem, index) => {
            this.townMap[county.value] = townResults[index].map((item: ITown) => {
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
        const snapshots = await this.collection.get()
        const promises = snapshots.docs.map((doc: DocumentSnapshot) => {
            return this.collection.doc(doc.id).delete()
        })
        await Promise.all(promises)
        for (const key in selectMap) {
            const options = selectMap[key]
            await this.collection.add({
                key,
                options
            })
        }
    }
}