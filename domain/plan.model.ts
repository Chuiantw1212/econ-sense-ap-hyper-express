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
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeSpouse(uid: string, spouse: IPlanSpouse) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            spouse,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeCareer(uid: string, career: IPlanCareer) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            career,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeRetirement(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const retirement: IPlanRetirement = {
            age: data.age || 0,
            insurance: {
                presentSeniority: data.insurance.presentSeniority || 0,
            },
            pension: {
                employerContribution: data.pension.employerContribution || 0,
                employerContributionIncome: data.pension.employerContributionIncome || 0,
                employeeContrubution: data.pension.employeeContrubution || 0,
                employeeContrubutionIncome: data.pension.employeeContrubutionIncome || 0,
                irrOverDecade: data.pension.irrOverDecade || 0,
                requestType: data.pension.requestType || ''
            },
            qualityLevel: data.qualityLevel,
            percentileRank: data.percentileRank,
        }
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            retirement,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeEstatePrice(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const estatePrice: IPlanEstatePrice = {
            county: data.county || '',
            town: data.town || '',
            buildingType: data.buildingType || '',
            buildingAge: data.buildingAge || '',
            hasParking: data.hasParking || '',
            unitPrice: data.unitPrice || 0,
        }
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            estatePrice,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeEstateSize(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const estateSize: IPlanEstateSize = {
            doubleBedRoom: data.doubleBedRoom || 0,
            singleBedRoom: data.singleBedRoom || 0,
            livingRoom: data.livingRoom || 0,
            bathroom: data.bathroom || 0,
            publicRatio: data.publicRatio || 0,
            balcany: data.balcany || 0,
            parkingSpace: data.parkingSpace || 0,
            floorSize: data.floorSize || 0,
        }
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            estateSize,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeMortgage(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const estate: IPlanMortgage = {
            downpayYear: data.downpayYear || 0,
            downpayPercent: data.downpayPercent || 0,
            interestRate: data.interestRate || 0,
            loanTerm: data.loanTerm || 0,
            totalPrice: data.totalPrice || 0,
            totalPriceEstimated: data.totalPriceEstimated || 0,
            downpay: data.downpay || 0,
            downpayGoal: data.downpayGoal || 0,
        }
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            estate,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeParenting(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const parenting: IPlanParenting = {
            childAnnualExpense: data.childAnnualExpense || 0,
            independantAge: data.independantAge || 0,
            firstBornYear: data.firstBornYear || 0,
            secondBornYear: data.secondBornYear || 0,
            spouseMonthlyContribution: data.spouseMonthlyContribution || 0,
            lifeInsurance: data.lifeInsurance || 0,
        }
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            parenting,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeInvestment(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const security: IPlanSecurity = {
            allocationETF: data.allocationETF || '',
            presentAsset: data.presentAsset || 0,
        }
        const user: IPlan = {
            id: singleDocSnapshot.id,
            uid,
            security,
        }
        singleDocSnapshot.ref.update({ ...user })
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
