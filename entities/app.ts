/**
 * 為了開發維護方便的Interface，在開發方法上無特別理論用意。
 */

import GetNewStoryService from "../domain/chat.service/GetNewStory.js"
import GetTranslationService from "../domain/chat.service/GetTranslation.js"
import GetBackedInterestRateService from "../domain/finance.service/GetBackedInterestRate.js"
import GetPortfolioIRRService from "../domain/finance.service/GetPortfolioIRR.js"
import GetLifeExpectancyService from "../domain/finance.service/GetLifeExpectancy.js"
import GetEstateUnitPriceService from "../domain/finance.service/GetEstateUnitPrice.js"
import GetOptionsService from "../domain/meta.service/GetOptions.js"
import GetTaiwanLocationService from "../domain/meta.service/GetTaiwanLocations.js"
import GetPlanEntityService from "../domain/plan.service/GetPlanEntity.js"
import PutCareerService from "../domain/plan.service/PutPlanCareer.js"
import PutEstatePriceService from "../domain/plan.service/PutPlanEstatePrice.js"
import PutEstateSizeService from "../domain/plan.service/PutPlanEstateSize.js"
import PutMortgageService from "../domain/plan.service/PutPlanMortagage.js"
import PutParentingService from "../domain/plan.service/PutPlanParenting.js"
import PutProfileService from "../domain/plan.service/PutPlanProfile.js"
import PutRetirementService from "../domain/plan.service/PutPlanRetirement.js"
import PutSecurityService from "../domain/plan.service/PutPlanSecurity.js"
import PutSpouseService from "../domain/plan.service/PutPlanSpouse.js"
import PostNewPlanService from "../domain/plan.service/PostNewPlan.js"
import GetUserPlanService from "../domain/plan.service/GetUserPlan.js"
import VerifyIdTokenService from "../domain/auth.service.js"

export interface ILocals {
    startupTime?: number,
    GetNewStoryService: GetNewStoryService,
    GetTranslationService: GetTranslationService,
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