const time = new Date().getTime()
// hyper-exoress cores
import HyperExpress from 'hyper-express';
import cors, { type CorsOptions } from 'cors'
// adapters
import firebase from './adapters/firebase.out.js'
import googleCloud from './adapters/googleCloud.out.js'
import chatGpt from './adapters/chatGpt.out.js'
import centralBank from './adapters/centralBank.out.js'
import ishares from './adapters/ishares.out.js'
// models
import SelectModel from './domain/Select.model.js'
import LifeExpectancyModel from './domain/LifeExpectancy.model.js';
import EstateContractModel from './domain/EstateContract.model.js'
import LocationModel from './domain/Location.model.js';
import PlanModel from './domain/Plan.model.js';
// services.others
import { ILocals } from './entities/app.js';
import GetNewStoryService from './domain/chat.service/GetNewStory.js';
import GetTranslationService from './domain/chat.service/GetTranslation.js';
import GetBackedInterestRateService from './domain/finance.service/GetBackedInterestRate.js';
import GetTaiwanLocationService from './domain/meta.service/GetTaiwanLocations.js';
import GetPortfolioIRRService from './domain/finance.service/GetPortfolioIRR.js';
import GetOptionsService from './domain/meta.service/GetOptions.js';
import GetLifeExpectancyService from './domain/finance.service/GetLifeExpectancy.js';
import GetEstateUnitPriceService from './domain/finance.service/GetEstateUnitPrice.js';
import VerifyIdTokenService from './domain/auth.service.js';
// services.plan
import PutEstatePriceService from './domain/plan.service/PutPlanEstatePrice.js';
import GetPlanEntityService from './domain/plan.service/GetPlanEntity.js';
import PutCareerService from './domain/plan.service/PutPlanCareer.js';
import PutEstateSizeService from './domain/plan.service/PutPlanEstateSize.js';
import PutMortgageService from './domain/plan.service/PutPlanMortagage.js';
import PutParentingService from './domain/plan.service/PutPlanParenting.js';
import PutProfileService from './domain/plan.service/PutPlanProfile.js';
import PutRetirementService from './domain/plan.service/PutPlanRetirement.js';
import PutSecurityService from './domain/plan.service/PutPlanSecurity.js';
import PutSpouseService from './domain/plan.service/PutPlanSpouse.js';
import PostNewPlanService from './domain/plan.service/PostNewPlan.js';
import GetUserPlanService from './domain/plan.service/GetUserPlan.js';
// controllers
import rootController from './adapters/blog.in/root.ctrl.js'
import bankController from './adapters/blog.in/bank.ctrl.js'
import calculateController from './adapters/blog.in/calculate.ctrl.js'
import chatController from './adapters/blog.in/chat.ctrl.js'
import selectController from './adapters/blog.in/select.ctrl.js'
import planController from './adapters/blog.in/plan.ctrl.js'
import interfaceController from './adapters/blog.in/interface.ctrl.js'
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
        origin: ['https://econ-sense.com', 'http://localhost:5173'],
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
