export interface IUserProfile {
    yearOfBirth: string,
    gender: string,
    careerInsuranceType: string,
    yearOfMarriage: string,
    story: string,
}

export interface IUserCareer {
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

export interface IUserRetirement {
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
    qualityLevel: number,
    percentileRank: number,
}

export interface IUserSecurity {
    allocationETF: string,
    presentAsset: number,
}

export interface IUserSpouse {
    yearOfMarriage: string,
    marriageLength: number,
    monthlyNetPay: number,
    monthlyExpense: number,
    weddingExpense: number,
    yearOfBirth: number,
}

export interface IUserParenting {
    childAnnualExpense: number,
    independantAge: number,
    firstBornYear: number,
    secondBornYear: number,
    spouseMonthlyContribution: number,
    lifeInsurance: number,
}

export interface IUserEstatePrice {
    county: string,
    town: string,
    buildingType: string,
    buildingAge: string,
    hasParking: string | boolean,
    unitPrice: number,
}

export interface IUserEstateSize {
    doubleBedRoom: number,
    singleBedRoom: number,
    livingRoom: number,
    bathroom: number,
    publicRatio: number,
    balcany: number,
    parkingSpace: number,
    floorSize: number,
}

export interface IUserMortgage {
    totalPrice: number,
    totalPriceEstimated: number,
    downpay: number, // 自備款
    downpayGoal: number, // 目標頭期款
    downpayYear: number,
    downpayPercent: number,
    loanTerm: number,
    interestRate: number,
}

export interface IUser {
    uid: string,
    id: string, // document id
    profile?: IUserProfile,
    career?: IUserCareer,
    retirement?: IUserRetirement,
    spouse?: IUserSpouse,
    estatePrice?: IUserEstatePrice,
    estateSize?: IUserEstateSize,
    estate?: IUserMortgage,
    parenting?: IUserParenting,
    security?: IUserSecurity,
}