import { Firestore, CollectionReference, } from 'firebase-admin/firestore'
import type { IPlanDoc, IPlanData } from '../entities/plan.js'

export default class PlanModel {
    collection: CollectionReference = null as any
    constructor(firestore: Firestore) {
        this.collection = firestore.collection('plans')
    }
    async mergeObject(uid: string, data: IPlanData) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const plan: IPlanDoc = {
            ...data,
            id: singleDocSnapshot.id,
            uid,
        }
        singleDocSnapshot.ref.update(plan)
    }
    async mergeDocField(uid: string, field: string, data: IPlanDoc[keyof IPlanDoc]) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlanDoc = {
            id: singleDocSnapshot.id,
            uid,
        }
        user[field] = data
        singleDocSnapshot.ref.update(user)
    }
    async checkSingleDoc(uid: string) {
        const targetQuery = this.collection.where('uid', '==', uid)
        const countData = await targetQuery.count().get()
        const count: number = countData.data().count
        if (count !== 1) {
            throw '資料重複'
        }
        const doc = (await targetQuery.get()).docs[0]
        return doc
    }
    async getPlan(uid: string): Promise<IPlanDoc> {
        const targetQuery = this.collection.where('uid', '==', uid)
        const snapshot = await targetQuery.get()
        const docs = snapshot.docs
        const docData = docs.pop()?.data() as IPlanDoc
        docs.forEach(doc => {
            this.collection.doc(doc.id).delete()
        })
        return docData
    }
    async addNewPlan(uid: string, planEntity: IPlanDoc): Promise<IPlanDoc> {
        const targetQuery = this.collection.where('uid', '==', uid)
        const countData = await targetQuery.count().get()
        const count: number = countData.data().count
        if (count !== 0) {
            throw '資料重複'
        }
        const docRef = this.collection.doc()
        const planForm: IPlanDoc = planEntity
        planForm.id = docRef.id
        planForm.uid = uid // IMPORTANT 否則新資料會是null
        this.collection.doc(planForm.id).set(planForm)
        return planForm
    }
}
