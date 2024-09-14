
import type { IPlan } from '../drivers/interfaces/plan'
class PlanEntity {
    id = ''
    uid = ''
    profile = {
        yearOfBirth: "",
        gender: "",
        careerInsuranceType: '',
        yearOfMarriage: '',
        story: '',
    }
    career = {
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
    }
    retirement = {
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
    }
    security = {
        allocationETF: "",
        presentAsset: 0,
    }
    spouse = {
        yearOfMarriage: '',
        marriageLength: 0,
        weddingExpense: 0,
        yearOfBirth: 0,
        monthlyNetPay: 0,
        monthlyExpense: 0,
    }
    parenting = {
        childAnnualExpense: 0,
        independantAge: 0,
        firstBornYear: 0,
        secondBornYear: 0,
        spouseMonthlyContribution: 0,
        lifeInsurance: 0,
    }
    estatePrice = {
        county: "",
        town: "",
        buildingType: "",
        buildingAge: "",
        hasParking: "",
        unitPrice: 0,
    }
    estateSize = {
        doubleBedRoom: 0,
        singleBedRoom: 0,
        livingRoom: 0,
        bathroom: 0,
        publicRatio: 0,
        balcany: 0,
        parkingSpace: 0,
        floorSize: 0,
    }
    estate = {
        totalPrice: 0,
        totalPriceEstimated: 0,
        downpay: 0,
        downpayGoal: 0,
        downpayYear: 0,
        downpayPercent: 0,
        interestRate: 0,
        loanTerm: 0,
    }
}
export default function getPlanEntity() {
    const planEntity: IPlan = new PlanEntity()
    return planEntity
}