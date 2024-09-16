import MakeStoryService from "../domain/chat.service/MakeStory"
import TranslateOccupationService from "../domain/chat.service/TranslateOccupation"
import GetBackedInterestRateService from "../domain/finance.service/GetBackedInterestRate"
import GetPortfolioIRRService from "../domain/finance.service/GetPortfolioIRR"
import GetLifeExpectancyService from "../domain/finance.service/GetLifeExpectancy"
import GetEstateUnitPriceService from "../domain/finance.service/GetEstateUnitPrice"
import GetOptionsService from "../domain/meta.service/GetOptions"
import GetTaiwanLocationService from "../domain/meta.service/GetTaiwanLocations"
import GetPlanEntityService from "../domain/plan.service/GetPlanEntity"
import PutCareerService from "../domain/plan.service/PutPlanCareer"
import PutEstatePriceService from "../domain/plan.service/PutPlanEstatePrice"
import PutEstateSizeService from "../domain/plan.service/PutPlanEstateSize"
import PutMortgageService from "../domain/plan.service/PutPlanMortagage"
import PutParentingService from "../domain/plan.service/PutPlanParenting"
import PutProfileService from "../domain/plan.service/PutPlanProfile"
import PutRetirementService from "../domain/plan.service/PutPlanRetirement"
import PutSecurityService from "../domain/plan.service/PutPlanSecurity"
import PutSpouseService from "../domain/plan.service/PutPlanSpouse"
import PostNewPlanService from "../domain/plan.service/PostNewPlan"
import GetUserPlanService from "../domain/plan.service/GetUserPlan"
import VerifyIdTokenService from "../domain/auth.service"

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
    VerifyIdTokenService: VerifyIdTokenService,
    // Plan
    GetPlanEntityService: GetPlanEntityService,
    PutCareerService: PutCareerService,
    PutEstatePriceService: PutEstatePriceService,
    PutEstateSizeService: PutEstateSizeService,
    PutMortgageService: PutMortgageService,
    PutParentingService: PutParentingService,
    PutProfileService: PutProfileService,
    PutRetirementService: PutRetirementService,
    PutSecurityService: PutSecurityService,
    PutSpouseService: PutSpouseService,
    PostNewPlanService: PostNewPlanService,
    GetUserPlanService: GetUserPlanService,
}

export interface IApp {
    locals: ILocals
}