import type { IOptionsItem, } from '../../entities/select'

export interface GetBackedInterestRateUseCase {
    getBackedInterestRate: () => Promise<number>
}

export interface GetPortfolioIRRUseCase {
    getPortfolioIRR: () => Promise<IOptionsItem[]>
}