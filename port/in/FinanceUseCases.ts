import type { IOptionsItem, } from '../../entities/select'

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


export interface GetBackedInterestRateUseCase {
    getBackedInterestRate: () => Promise<number>
}

export interface GetPortfolioIRRUseCase {
    getPortfolioIRR: () => Promise<IOptionsItem[]>
}

export interface GetLifeExpectancyUseCase {
    getLifeExpectancy: (arg0: ILifeExpectancyItem) => Promise<number>
}