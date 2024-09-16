import MakeStoryService from "../domain/chat.service/MakeStory"
import TranslateOccupationService from "../domain/chat.service/TranslateOccupation"
import GetBackedInterestRateService from "../domain/finance.service/GetBackedInterestRate"
import GetPortfolioIRRService from "../domain/finance.service/GetPortfolioIRR"
import GetLifeExpectancyService from "../domain/finance.service/GetLifeExpectancy"
import GetEstateUnitPriceService from "../domain/finance.service/GetEstateUnitPrice"
import GetOptionsService from "../domain/meta.service/GetOptions"
import GetTaiwanLocationService from "../domain/meta.service/GetTaiwanLocations"
import GetPlanInterfaceService from "../domain/plan.service/GetPlanInterface"

export interface ILocals {
    startupTime?: number,
    MakeStoryService: MakeStoryService,
    TranslateOccupationService: TranslateOccupationService,
    GetBackedInterestRateService: GetBackedInterestRateService,
    GetPortfolioIRRService: GetPortfolioIRRService,
    GetLifeExpectancyService: GetLifeExpectancyService,
    GetEstateUnitPriceService: GetEstateUnitPriceService,
    GetOptionsService: GetOptionsService,
    GetTaiwanLocationService: GetTaiwanLocationService,
    GetPlanInterfaceService: GetPlanInterfaceService,
}

export interface IApp {
    locals: ILocals
}