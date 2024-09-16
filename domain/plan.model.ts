import { Firestore, CollectionReference, } from 'firebase-admin/firestore'
import type {
    IPlanProfile,
    IPlanCareer,
    IPlanRetirement,
    IPlanSecurity,
    IPlanSpouse,
    IPlanParenting,
    IPlanEstatePrice,
    IPlanEstateSize,
    IPlanMortgage,
    IPlan,
} from '../entities/plan'

export default class PlanModel {
    collection: CollectionReference = null as any
    constructor(firestore: Firestore) {
        this.collection = firestore.collection('plans')
    }
    async mergeProfile(uid: string, profile: IPlanProfile) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            profile,
        }
        singleDocSnapshot.ref.update(user)
    }
    async mergeSpouse(uid: string, spouse: IPlanSpouse) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            spouse,
        }
        singleDocSnapshot.ref.update(user)
    }
    async mergeCareer(uid: string, career: IPlanCareer) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            career,
        }
        singleDocSnapshot.ref.update(user)
    }
    async mergeRetirement(uid: string, retirement: IPlanRetirement) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            retirement,
        }
        singleDocSnapshot.ref.update(user)
    }
    async mergeEstatePrice(uid: string, estatePrice: IPlanEstatePrice) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            estatePrice,
        }
        singleDocSnapshot.ref.update(user)
    }
    async mergeEstateSize(uid: string, estateSize: IPlanEstateSize) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            estateSize,
        }
        singleDocSnapshot.ref.update(user)
    }
    async mergeMortgage(uid: string, estate: IPlanMortgage) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            estate,
        }
        singleDocSnapshot.ref.update(user)
    }
    async mergeParenting(uid: string, parenting: IPlanParenting) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            parenting,
        }
        singleDocSnapshot.ref.update(user)
    }
    async mergeSecurity(uid: string, security: IPlanSecurity) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            security,
        }
        singleDocSnapshot.ref.update(user)
    }
    async checkSingleDoc(uid: string) {
        const targetQuery = this.collection.where('uid', '==', uid)
        const countData = await targetQuery.count().get()
        const count: number = countData.data().count
        if (count !== 1) {
            throw '資料重複'
        }
        return (await targetQuery.get()).docs[0]
    }
    async getPlan(uid: string) {
        const targetQuery = this.collection.where('uid', '==', uid)
        const snapshot = await targetQuery.get()
        const docs = snapshot.docs
        const docData = docs.pop()?.data()
        docs.forEach(doc => {
            this.collection.doc(doc.id).delete()
        })
        return docData
    }
    async addNewPlan(uid: string, planEntity: IPlan) {
        const targetQuery = this.collection.where('uid', '==', uid)
        const countData = await targetQuery.count().get()
        const count: number = countData.data().count
        if (count !== 0) {
            throw '資料重複'
        }
        const docRef = this.collection.doc()
        const planForm: IPlan = planEntity
        planForm.id = docRef.id
        planForm.uid = uid // IMPORTANT 否則新資料會是null
        this.collection.doc(planForm.id).set(planForm)
        return planForm
    }
}
