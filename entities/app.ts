import TranslateOccupationService from "../domain/chat.service/TranslateOccupation"
import GetBackedInterestRateService from "../domain/finance.service/GetBackedInterestRate"
import GetPortfolioIRRService from "../domain/finance.service/GetPortfolioIRR"
import GetLifeExpectancyService from "../domain/finance.service/GetLifeExpectancy"

export interface ILocals {
    startupTime?: number,
    TranslateOccupationService: TranslateOccupationService,
    GetBackedInterestRateService: GetBackedInterestRateService,
    GetPortfolioIRRService: GetPortfolioIRRService,
    GetLifeExpectancyService: GetLifeExpectancyService,
}

export interface IApp {
    locals: ILocals
}