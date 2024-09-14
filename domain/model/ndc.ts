
import { Firestore, Query, CollectionReference, DocumentData } from 'firebase-admin/firestore'

interface INdcLifeExpectancyRawItem {
    '項次': string,
    '西元年': string,
    '民國年': string,
    '性別': string,
    '年齡': string,
    '預期壽命': string
}

interface INdcLifeExpectancyItem {
    ceYear?: number,
    rocYear?: number,
    gender?: string,
    age?: number,
    lifeExpectancy?: number
}

export class NdcModel {
    collectionLifeExpectancy: CollectionReference = null as any
    initialize(firestore: Firestore) {
        this.collectionLifeExpectancy = firestore.collection('lifeExpectancies')
    }
    async calculateLifeExpectancy(query: INdcLifeExpectancyItem): Promise<number> {
        let lifeExpQuery: Query = this.collectionLifeExpectancy
        if (query.ceYear) {
            lifeExpQuery = lifeExpQuery.where('ceYear', '==', query.ceYear)
        }
        if (query.age) {
            lifeExpQuery = lifeExpQuery.where('age', '==', query.age)
        }
        if (query.gender) {
            lifeExpQuery = lifeExpQuery.where('gender', '==', query.gender)
        }
        const lifeExpSnapshot = await lifeExpQuery.limit(1).get()
        if (lifeExpSnapshot.size) {
            const lifeExpDocData: INdcLifeExpectancyItem = lifeExpSnapshot.docs[0].data()
            return lifeExpDocData.lifeExpectancy as number
        } else {
            return 0
        }
    }
    async uploadFiles() {
        const dataset: INdcLifeExpectancyRawItem[] = require('./8bef5427a12789acdf8c0411131d9221_export.json')
        const hasGenderItem = dataset.filter(item => {
            return ['男性', '女性'].includes(item['性別'])
        })

        const countData: DocumentData = await this.collectionLifeExpectancy.count().get()
        const count: number = countData.data().count
        const items: INdcLifeExpectancyItem[] = hasGenderItem.slice(count, hasGenderItem.length).map(item => {
            const genderMap: { [key: string]: string } = {
                "男性": "M",
                "女性": "F"
            }
            const gender = genderMap[item['性別']]
            const ageItem = item['年齡'].replace('歲', '')
            return {
                ceYear: Number(item['西元年']),
                rocYear: Number(item['民國年']),
                gender: gender,
                age: Number(ageItem),
                lifeExpectancy: Number(item['預期壽命']),
            }
        })
        let index = 0
        setInterval(async () => {
            const item = items[index++]
            await this.collectionLifeExpectancy.add(item)
            console.log(`total ${items.length}, ${index} added.`)
        }, 100)
    }
}
const ndcModel = new NdcModel()
export default ndcModel