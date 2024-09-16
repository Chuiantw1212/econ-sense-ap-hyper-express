import type { IOptionsItem, } from '../entities/select'
import { Query, QuerySnapshot, CollectionReference, DocumentReference, DocumentData, Firestore } from 'firebase-admin/firestore'

export default class SelectModel {
    collection: CollectionReference = null as any
    constructor(firestore: Firestore) {
        this.collection = firestore.collection('selects')
    } 
    async getOptionsByKey(key: string,): Promise<IOptionsItem[]> {
        const keyQuery: Query = this.collection.where('key', '==', key).limit(1)
        const snapshot: QuerySnapshot = await keyQuery.get()
        if (snapshot.docs.length) {
            const options: IOptionsItem[] = snapshot.docs[0].data().options
            return options
        } else {
            return []
        }
    }
    async replaceByKey(key: string, options: IOptionsItem[] = []) {
        const keyQuery: Query = this.collection.where('key', '==', key)
        const countData: DocumentData = await keyQuery.count().get()
        const count: number = countData.data().count
        switch (count) {
            case 0: {
                this.collection.add({
                    key,
                    options
                })
                break;
            }
            case 1: {
                const snapshot: QuerySnapshot = await keyQuery.get()
                snapshot.forEach(data => {
                    const dataReference: DocumentReference = data.ref
                    dataReference.set({
                        options,
                    }, { merge: true });
                })
                break;
            }
            default: {
                throw '資料有誤'
            }
        }
    }
}