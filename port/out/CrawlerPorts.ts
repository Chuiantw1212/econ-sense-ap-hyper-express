import { IPriceTableItem } from "../in/FinanceUseCases";

export interface CrawInterestRatePort {
    crawBackedlInterestRate: () => Promise<number>
}

export interface GetEstateContractPort {
    getContractPriceTable: () => Promise<IPriceTableItem[]>
}