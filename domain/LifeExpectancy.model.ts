
import { Firestore, Query, CollectionReference, } from 'firebase-admin/firestore'
import { ILifeExpectancyItem, } from '../port/in/FinanceUseCases.js'
export default class LifeExpectancyModel {
    collectionLifeExpectancy: CollectionReference = null as any
    constructor(firestore: Firestore) {
        this.collectionLifeExpectancy = firestore.collection('lifeExpectancies')
    }
    async queryLifeExpectancy(query: ILifeExpectancyItem): Promise<number> {
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
            const lifeExpDocData: ILifeExpectancyItem = lifeExpSnapshot.docs[0].data()
            return lifeExpDocData.lifeExpectancy as number
        } else {
            return 0
        }
    }
}