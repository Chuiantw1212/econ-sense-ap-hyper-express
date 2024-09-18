import { IPriceTableItem } from "../in/FinanceUseCases.js";

export interface CrawInterestRatePort {
    crawBackedlInterestRate: () => Promise<number>
}

export interface GetEstateContractPort {
    getContractPriceTable: () => Promise<IPriceTableItem[]>
}