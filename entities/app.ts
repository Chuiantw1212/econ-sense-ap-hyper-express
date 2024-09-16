import MakeStoryService from "../domain/chat.service/MakeStory"
import TranslateOccupationService from "../domain/chat.service/TranslateOccupation"
import GetBackedInterestRateService from "../domain/finance.service/GetBackedInterestRate"
import GetPortfolioIRRService from "../domain/finance.service/GetPortfolioIRR"
import GetLifeExpectancyService from "../domain/finance.service/GetLifeExpectancy"
import GetEstateUnitPrice from "../domain/finance.service/GetEstateUnitPrice"

export interface ILocals {
    startupTime?: number,
    MakeStoryService: MakeStoryService,
    TranslateOccupationService: TranslateOccupationService,
    GetBackedInterestRateService: GetBackedInterestRateService,
    GetPortfolioIRRService: GetPortfolioIRRService,
    GetLifeExpectancyService: GetLifeExpectancyService,
    GetEstateUnitPrice: GetEstateUnitPrice,
}

export interface IApp {
    locals: ILocals
}