import fp from 'fastify-plugin'
import type { extendsFastifyInstance } from '../types/fastify'
import type { IOptionsItem, ISelectMap, ISelectDocData } from '../types/select'
import { Query, QuerySnapshot, CollectionReference, DocumentReference, DocumentData } from 'firebase-admin/firestore'

export class SelectModel {
    collection: CollectionReference
    options: ISelectMap = {}
    optionKeys: string[] = ['floorSizes', 'buildingAges', 'buildingTypes', 'genders', 'retirementQuartile', 'insuranceTypes']
    constructor(fastify: extendsFastifyInstance) {
        const { firestore } = fastify.firebase
        this.collection = firestore.collection('selects')
        this.setOptions()
    }
    setOptions() {
        this.optionKeys.forEach(async key => {
            const options = await this.getOptionsByKey(key)
            this.options[key] = options
        })
    }
    async getOptionsMap() {
        const promises = this.optionKeys.map(async (key: string) => {
            let options = this.options[key]
            if (!options?.length) {
                options = await this.getOptionsByKey(key)
            }
            const selectDocData: ISelectDocData = {
                key: key,
                options
            }
            return selectDocData
        })
        const docDatas: ISelectDocData[] = await Promise.all(promises)
        const selectMap: ISelectMap = {}
        docDatas.forEach(docData => {
            selectMap[docData.key] = docData.options
        })
        return selectMap
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
export default fp(async function (fastify: any) {
    fastify.decorate('SelectModel', new SelectModel(fastify))
})