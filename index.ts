const time = new Date().getTime()
// hyper-exoress cores
import { config } from 'dotenv'
config()
import HyperExpress from 'hyper-express';
import cors, { type CorsOptions } from 'cors'
// adapters
import firebase from './adapters/firebase.out'
import googleCloud from './adapters/googleCloud.out'
import chatGpt from './adapters/chatGpt.out'
import centralBank from './adapters/centralBank.out'
import ishares from './adapters/ishares.out'
// models
import SelectModel from './domain/Select.model'
import LifeExpectancyModel from './domain/LifeExpectancy.model';
import EstateContractModel from './domain/EstateContract.model'
import LocationModel from './domain/Location.model';
import PlanModel from './domain/Plan.model';
// services.others
import { ILocals } from './entities/app';
import GetNewStoryService from './domain/chat.service/GetNewStory';
import GetTranslationService from './domain/chat.service/GetTranslation';
import GetBackedInterestRateService from './domain/finance.service/GetBackedInterestRate';
import GetTaiwanLocationService from './domain/meta.service/GetTaiwanLocations';
import GetPortfolioIRRService from './domain/finance.service/GetPortfolioIRR';
import GetOptionsService from './domain/meta.service/GetOptions';
import GetLifeExpectancyService from './domain/finance.service/GetLifeExpectancy';
import GetEstateUnitPriceService from './domain/finance.service/GetEstateUnitPrice';
import VerifyIdTokenService from './domain/auth.service';
// services.plan
import PutEstatePriceService from './domain/plan.service/PutPlanEstatePrice';
import GetPlanEntityService from './domain/plan.service/GetPlanEntity';
import PutCareerService from './domain/plan.service/PutPlanCareer';
import PutEstateSizeService from './domain/plan.service/PutPlanEstateSize';
import PutMortgageService from './domain/plan.service/PutPlanMortagage';
import PutParentingService from './domain/plan.service/PutPlanParenting';
import PutProfileService from './domain/plan.service/PutPlanProfile';
import PutRetirementService from './domain/plan.service/PutPlanRetirement';
import PutSecurityService from './domain/plan.service/PutPlanSecurity';
import PutSpouseService from './domain/plan.service/PutPlanSpouse';
import PostNewPlanService from './domain/plan.service/PostNewPlan';
import GetUserPlanService from './domain/plan.service/GetUserPlan';
// controllers
import rootController from './adapters/blog.in/root.ctrl'
import bankController from './adapters/blog.in/bank.ctrl'
import calculateController from './adapters/blog.in/calculate.ctrl'
import chatController from './adapters/blog.in/chat.ctrl'
import selectController from './adapters/blog.in/select.ctrl'
import planController from './adapters/blog.in/plan.ctrl'
import interfaceController from './adapters/blog.in/interface.ctrl'
// 初始化server
(async () => {
    const webserver = new HyperExpress.Server()
    /**
     * plugins
     */
    // Load chatGpt
    let OPENAI_API_KEY: string = ''
    try {
        OPENAI_API_KEY = await googleCloud.accessSecret('OPENAI_API_KEY')
    } catch {
        // 這段讀不到就算了
        OPENAI_API_KEY = require("./OPEN_API_KEY.json");
    }
    chatGpt.initializeSync(OPENAI_API_KEY)
    // Load firebase
    let FIREBASE_SERVICE_ACCOUNT_KEY_JSON = null
    try {
        FIREBASE_SERVICE_ACCOUNT_KEY_JSON = await googleCloud.accessSecret('FIREBASE_SERVICE_ACCOUNT_KEY_JSON')
    } catch {
        FIREBASE_SERVICE_ACCOUNT_KEY_JSON = require("./FIREBASE_SERVICE_ACCOUNT_KEY_JSON.json");
    }
    const firestore = await firebase.initializeSync(FIREBASE_SERVICE_ACCOUNT_KEY_JSON)
    /**
     * models
     */

    const selectModel = new SelectModel(firestore)
    const lifeExpectancyModel = new LifeExpectancyModel(firestore)
    const estateContractModel = new EstateContractModel(firestore)
    const locationModel = new LocationModel(firestore)
    const planModel = new PlanModel(firestore)

    /**
     * Services
     */
    const allServices: ILocals = {
        GetNewStoryService: new GetNewStoryService(chatGpt),
        GetTranslationService: new GetTranslationService(chatGpt),
        GetBackedInterestRateService: new GetBackedInterestRateService({
            adapter: centralBank,
            model: selectModel,
        }),
        GetPortfolioIRRService: new GetPortfolioIRRService({
            adapter: ishares,
            model: selectModel,
        }),
        GetOptionsService: new GetOptionsService({
            model: selectModel
        }),
        GetLifeExpectancyService: new GetLifeExpectancyService({
            model: lifeExpectancyModel,
        }),
        GetEstateUnitPriceService: new GetEstateUnitPriceService({
            estateContractsModel: estateContractModel,
            locationModel: locationModel
        }),
        GetTaiwanLocationService: new GetTaiwanLocationService({
            model: locationModel
        }),
        // Plan
        GetPlanEntityService: new GetPlanEntityService(),
        PostNewPlanService: new PostNewPlanService(planModel),
        GetUserPlanService: new GetUserPlanService(planModel),
        PutCareerService: new PutCareerService(planModel),
        PutEstateSizeService: new PutEstateSizeService(planModel),
        PutMortgageService: new PutMortgageService(planModel),
        PutParentingService: new PutParentingService(planModel),
        PutProfileService: new PutProfileService(planModel),
        PutRetirementService: new PutRetirementService(planModel),
        PutSecurityService: new PutSecurityService(planModel),
        PutSpouseService: new PutSpouseService(planModel),
        PutEstatePriceService: new PutEstatePriceService(planModel),
        VerifyIdTokenService: new VerifyIdTokenService(firebase)
    }
    Object.assign(webserver.locals, {
        ...allServices
    })
    /**
     * middlewares
     */
    const corsConfig: CorsOptions = {
        origin: process.env.ORIGIN || 'http://localhost:5173',
    }
    webserver.use(cors(corsConfig))

    /**
     * controllers
     */
    webserver.use('/', rootController)
    webserver.use('/', bankController)
    webserver.use('/', calculateController)
    webserver.use('/', chatController)
    webserver.use('/', selectController)
    webserver.use('/', planController)
    webserver.use('/', interfaceController)

    /**
     * start listening
     */
    await webserver.listen(8080)
    const timeEnd = new Date().getTime()
    const timeDiff = (timeEnd - time) / 1000
    Object.assign(webserver.locals, { // 將locals當作decorate使用
        startupTime: timeDiff,
    })
    console.log(`Webserver started in ${timeDiff}s`)
})()
