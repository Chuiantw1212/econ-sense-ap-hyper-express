/**
 * DDD解說
 * Aggregate: 數個Entity以及Value Object的集合，在商業邏輯上組成一個完整單位。
 * 以本專案為例，如果證券可以串接到證券商，地產可以串到銀行，該資料層級就會從Value Object變成Entity。那財務規劃本身就會毫無疑問變成Aggregate。
 * 
 * Entity: 有ID可識別的資料
 * Value Object: 不可識別，但該物件有完整的意義
 */

export interface IPlanProfile {
    yearOfBirth: string,
    gender: string,
    careerInsuranceType: string,
    yearOfMarriage: string,
    story: string,
}

export interface IPlanCareer {
    // 勞保
    headCount: number,
    insuredUnit: string,
    // 公保
    payPoint: number,
    supervisorRank: string,
    professionalRank: string,
    regionalAllowance: number,
    // 共同
    monthlyBasicSalary: number,
    pension: {
        rate: number,
        monthlyContributionSelf: number,
    },
    monthlyNetPay: number,
    monthlyExpense: number,
}

export interface IPlanRetirement {
    age: number,
    insurance: {
        presentSeniority: number,
    },
    pension: {
        // 勞保
        employerContribution: number,
        employerContributionIncome: number,
        employeeContrubution: number,
        employeeContrubutionIncome: number,
        irrOverDecade: number,
        // 公保
        requestType: string,
    },
    // 失能與照顧
    monthlyLivingExpense: number,
    disability: {
        age: number,
        monthlyLivingExpense: number,
        monthlyCaringExpense: number,
        housing: string,
        carer: string,
    }
}

export interface IPlanSecurity {
    allocationETF: string,
    presentAsset: number,
}

export interface IPlanSpouse {
    yearOfMarriage: string,
    marriageLength: number,
    monthlyNetPay: number,
    monthlyExpense: number,
    weddingExpense: number,
    yearOfBirth: number | string,
}

export interface IPlanParenting {
    childAnnualExpense: number,
    independantAge: number,
    firstBornYear: number,
    secondBornYear: number,
    spouseMonthlyContribution: number,
    lifeInsurance: number,
}

export interface IPlanEstatePrice {
    county: string,
    town: string,
    buildingType: string,
    buildingAge: string,
    hasParking: string | boolean,
    unitPrice: number,
}

export interface IPlanEstateSize {
    doubleBedRoom: number,
    singleBedRoom: number,
    livingRoom: number,
    bathroom: number,
    publicRatio: number,
    balcany: number,
    parkingSpace: number,
    floorSize: number,
}

export interface IPlanMortgage {
    totalPrice: number,
    totalPriceEstimated: number,
    downpay: number, // 自備款
    downpayGoal: number, // 目標頭期款
    downpayYear: number,
    downpayPercent: number,
    loanTerm: number,
    interestRate: number,
}

export interface IPlanData {
    profile?: IPlanProfile,
    career?: IPlanCareer,
    retirement?: IPlanRetirement,
    spouse?: IPlanSpouse,
    estatePrice?: IPlanEstatePrice,
    estateSize?: IPlanEstateSize,
    parenting?: IPlanParenting,
    security?: IPlanSecurity,
    mortgage?: IPlanMortgage,
}

export interface IPlanDoc extends IPlanData {
    [key: string]: any
    uid: string,
    id: string, // document id
}

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
        monthlyLivingExpense: 0,
        disability: {
            age: 0,
            monthlyLivingExpense: 0,
            monthlyCaringExpense: 0,
            housing: "",
            carer: "",
        }
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

/** 型別檢查用 */
export function getNewPlanEntity() {
    const entity: IPlanDoc = new PlanEntity()
    return entity
}

export default PlanEntity