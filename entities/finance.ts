import type { IOptionsItem, } from './select.js'

export interface ILifeExpectancyItem {
    ceYear?: number,
    rocYear?: number,
    gender?: string,
    age?: number,
    lifeExpectancy?: number
}

export interface INdcLifeExpectancyRawItem {
    '項次': string,
    '西元年': string,
    '民國年': string,
    '性別': string,
    '年齡': string,
    '預期壽命': string
}

export interface IPriceTableItem {
    county?: string,
    town?: string,
    contractYear?: string,
    buildingType?: string,
    unitPrice?: number,
    floorSize?: string,
    buildingAge?: string,
    hasParking?: boolean,
}

export interface GetBackedInterestRateUseCase {
    getBackedInterestRate: () => Promise<number>
}

export interface GetPortfolioIRRUseCase {
    getPortfolioIRR: () => Promise<IOptionsItem[]>
}

export interface GetLifeExpectancyUseCase {
    getLifeExpectancy: (arg0: ILifeExpectancyItem) => Promise<number>
}

export interface GetEstateUnitPriceUseCase {
    getEstateUnitPrice: (arg0: IPriceTableItem) => Promise<{
        count: number,
        pr25: number,
        pr75: number,
        average: number
    }>
}