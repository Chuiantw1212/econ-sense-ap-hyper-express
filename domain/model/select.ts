import type { IOptionsItem, ISelectMap, ISelectDocData } from '../../entities/select'
import { Query, QuerySnapshot, CollectionReference, DocumentReference, DocumentData, Firestore } from 'firebase-admin/firestore'

export class SelectModel {
    collection: CollectionReference = null as any
    optionsMap: ISelectMap = {}
    optionKeys: string[] = ['floorSizes', 'buildingAges', 'buildingTypes', 'genders', 'retirementQuartile', 'insuranceTypes']
    initialize(firestore: Firestore) {
        this.collection = firestore.collection('selects')
    }
    async getOptionsMap() {
        // 如有現成就用現成
        const promises = this.optionKeys.map(async (key: string) => {
            let options = this.optionsMap[key]
            if (!options?.length) {
                options = await this.getOptionsByKey(key)
                this.optionsMap[key] = options
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
const selectModel = new SelectModel()
export default selectModel