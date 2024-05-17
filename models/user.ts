import { Firestore, CollectionReference, Query, DocumentSnapshot, DocumentData } from 'firebase-admin/firestore'
import type {
    IUserProfile,
    IUserCareer,
    IUserRetirement,
    IUserSecurity,
    IUserSpouse,
    IUserParenting,
    IUserEstatePrice,
    IUserEstateSize,
    IUserMortgage,
    IUser,
} from '../types/user'

export class UserModel {
    collection: CollectionReference = null as any
    initialize(firestore: Firestore) {
        this.collection = firestore.collection('users')
    }
    async mergeProfile(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const profile: IUserProfile = {
            gender: data.gender || '',
            yearOfBirth: data.yearOfBirth || '',
            careerInsuranceType: data.careerInsuranceType || '',
            yearOfMarriage: data.yearOfMarriage || '',
            story: data.story || '',
        }
        const user: IUser = {
            id: singleDocSnapshot.id,
            uid,
            profile,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeSpouse(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const spouse: IUserSpouse = {
            yearOfBirth: data.yearOfBirth || '',
            yearOfMarriage: data.yearOfMarriage || '',
            marriageLength: data.marriageLength || 0,
            weddingExpense: data.weddingExpense || 0,
            monthlyNetPay: data.monthlyNetPay || 0,
            monthlyExpense: data.monthlyExpense || 0,
        }
        const user: IUser = {
            id: singleDocSnapshot.id,
            uid,
            spouse,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeCareer(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const career: IUserCareer = {
            // 勞保
            headCount: data.headCount || 0,
            insuredUnit: data.insuredUnit || '',
            // 公保
            payPoint: data.payPoint || 0,
            supervisorRank: data.supervisorRank || '',
            professionalRank: data.professionalRank || '',
            regionalAllowance: data.regionalAllowance || 0,
            // 共同
            monthlyBasicSalary: data.monthlyBasicSalary || 0,
            pension: {
                rate: data.pension.rate || 0,
                monthlyContributionSelf: data.pension.monthlyContributionSelf || 0
            },
            monthlyNetPay: data.monthlyNetPay || 0,
            monthlyExpense: data.monthlyExpense || 0
        }
        const user: IUser = {
            id: singleDocSnapshot.id,
            uid,
            career,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeRetirement(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const retirement: IUserRetirement = {
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
        const user: IUser = {
            id: singleDocSnapshot.id,
            uid,
            retirement,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeEstatePrice(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const estatePrice: IUserEstatePrice = {
            county: data.county || '',
            town: data.town || '',
            buildingType: data.buildingType || '',
            buildingAge: data.buildingAge || '',
            hasParking: data.hasParking || '',
            unitPrice: data.unitPrice || 0,
        }
        const user: IUser = {
            id: singleDocSnapshot.id,
            uid,
            estatePrice,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeEstateSize(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const estateSize: IUserEstateSize = {
            doubleBedRoom: data.doubleBedRoom || 0,
            singleBedRoom: data.singleBedRoom || 0,
            livingRoom: data.livingRoom || 0,
            bathroom: data.bathroom || 0,
            publicRatio: data.publicRatio || 0,
            balcany: data.balcany || 0,
            parkingSpace: data.parkingSpace || 0,
            floorSize: data.floorSize || 0,
        }
        const user: IUser = {
            id: singleDocSnapshot.id,
            uid,
            estateSize,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeMortgage(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const estate: IUserMortgage = {
            downpayYear: data.downpayYear || 0,
            downpayPercent: data.downpayPercent || 0,
            interestRate: data.interestRate || 0,
            loanTerm: data.loanTerm || 0,
            totalPrice: data.totalPrice || 0,
            totalPriceEstimated: data.totalPriceEstimated || 0,
            downpay: data.downpay || 0,
            downpayGoal: data.downpayGoal || 0,

        }
        const user: IUser = {
            id: singleDocSnapshot.id,
            uid,
            estate,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeParenting(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const parenting: IUserParenting = {
            childAnnualExpense: data.childAnnualExpense || 0,
            independantAge: data.independantAge || 0,
            firstBornYear: data.firstBornYear || 0,
            secondBornYear: data.secondBornYear || 0,
            spouseMonthlyContribution: data.spouseMonthlyContribution || 0,
            lifeInsurance: data.lifeInsurance || 0,
        }
        const user: IUser = {
            id: singleDocSnapshot.id,
            uid,
            parenting,
        }
        singleDocSnapshot.ref.update({ ...user })
    }
    async mergeInvestment(uid: string, data: any = {}) {
        const singleDocSnapshot = await this.checkSingleDoc(uid)
        const security: IUserSecurity = {
            allocationETF: data.allocationETF || '',
            presentAsset: data.presentAsset || 0,
        }
        const user: IUser = {
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
    async getUser(uid: string) {
        const targetQuery = this.collection.where('uid', '==', uid)
        const countData = await targetQuery.count().get()
        const count: number = countData.data().count
        if (count === 1) {
            const docData = (await targetQuery.get()).docs[0].data()
            return docData
        }
    }
    async addNewUser(uid: string) {
        const targetQuery = this.collection.where('uid', '==', uid)
        const countData = await targetQuery.count().get()
        const count: number = countData.data().count
        if (count !== 0) {
            throw '資料重複'
        }
        const docRef = this.collection.doc()
        const userForm: IUser = this.getUserForm()
        userForm.id = docRef.id
        userForm.uid = userForm.uid
        this.collection.doc(userForm.id).set(userForm)
        return userForm
    }
    getUserForm() {
        const userForm: IUser = {
            id: '',
            uid: '',
            profile: {
                yearOfBirth: "",
                gender: "",
                careerInsuranceType: '',
                yearOfMarriage: '',
                story: '',
            },
            career: {
                // 勞保
                headCount: 0,
                insuredUnit: '',
                // 公保
                payPoint: 0,
                supervisorRank: '',
                professionalRank: '',
                regionalAllowance: 0,
                // 共同
                monthlyBasicSalary: 0,
                pension: {
                    rate: 0,
                    monthlyContributionSelf: 0,
                },
                monthlyNetPay: 0,
                monthlyExpense: 0
            },
            retirement: {
                age: 0,
                insurance: {
                    presentSeniority: 0,
                },
                pension: {
                    employerContribution: 0,
                    employerContributionIncome: 0,
                    employeeContrubution: 0,
                    employeeContrubutionIncome: 0,
                    irrOverDecade: 0,
                    requestType: '',
                },
                qualityLevel: 0,
                percentileRank: 0,
            },
            security: {
                allocationETF: "",
                presentAsset: 0,
            },
            spouse: {
                yearOfMarriage: '',
                marriageLength: 0,
                weddingExpense: 0,
                yearOfBirth: 0,
                monthlyNetPay: 0,
                monthlyExpense: 0,
            },
            parenting: {
                childAnnualExpense: 0,
                independantAge: 0,
                firstBornYear: 0,
                secondBornYear: 0,
                spouseMonthlyContribution: 0,
                lifeInsurance: 0,
            },
            estatePrice: {
                county: "",
                town: "",
                buildingType: "",
                buildingAge: "",
                hasParking: "",
                unitPrice: 0,
            },
            estateSize: {
                doubleBedRoom: 0,
                singleBedRoom: 0,
                livingRoom: 0,
                bathroom: 0,
                publicRatio: 0,
                balcany: 0,
                parkingSpace: 0,
                floorSize: 0,
            },
            estate: {
                totalPrice: 0,
                totalPriceEstimated: 0,
                downpay: 0,
                downpayGoal: 0,
                downpayYear: 0,
                downpayPercent: 0,
                interestRate: 0,
                loanTerm: 0,
            },
        }
        return userForm
    }
}

const userModel = new UserModel()
export default userModel