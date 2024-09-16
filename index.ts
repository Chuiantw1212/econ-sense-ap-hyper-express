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
import SelectModel from './domain/select.model'
import jcicModel from './domain/jcic.model'
import locationModel from './domain/location.model'
import planModel from './domain/plan.model';
import ndcModel from './domain/lifeExpectancy.model';
// services
import MakeStoryService from './domain/chat.service/MakeStory';
import TranslateOccupationService from './domain/chat.service/TranslateOccupation';
import GetBackedInterestRateService from './domain/finance.service/GetBackedInterestRate'
import GetPortfolioIRRService from './domain/finance.service/GetPortfolioIRR'
import GetOptionsService from './domain/meta.service/GetOptions';
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
    } catch (error: any) {
        // 這段讀不到就算了
        OPENAI_API_KEY = require("./OPEN_API_KEY.json");
    }
    chatGpt.initializeSync(OPENAI_API_KEY)
    // Load firebase
    let FIREBASE_SERVICE_ACCOUNT_KEY_JSON = null
    try {
        FIREBASE_SERVICE_ACCOUNT_KEY_JSON = await googleCloud.accessSecret('FIREBASE_SERVICE_ACCOUNT_KEY_JSON')
    } catch (error) {
        FIREBASE_SERVICE_ACCOUNT_KEY_JSON = require("./FIREBASE_SERVICE_ACCOUNT_KEY_JSON.json");
    }
    const firestore = await firebase.initializeSync(FIREBASE_SERVICE_ACCOUNT_KEY_JSON)
    /**
     * models
     */

    const selectModel = new SelectModel(firestore)
    // selectModel.initialize(firestore)
    locationModel.initialize(firestore)
    planModel.initialize(firestore)
    jcicModel.initialize({
        selectModel,
        firestore,
        locationModel
    })
    ndcModel.initialize(firestore)
    /**
     * Services
     */
    Object.assign(webserver.locals, {
        MakeStoryService: new MakeStoryService(chatGpt),
        TranslateOccupationService: new TranslateOccupationService(chatGpt),
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
        })
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
