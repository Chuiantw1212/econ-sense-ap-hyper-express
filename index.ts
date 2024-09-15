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
// services & models
import MakeStoryService from './domain/chat/service/MakeStory';
import TranslateOccupationService from './domain/chat/service/TranslateOccupation';
import selectModel from './domain/model/select'
import bankModel from './domain/model/bank'
import jcicModel from './domain/model/jcic'
import locationModel from './domain/model/location'
import planModel from './domain/model/plan';
import ndcModel from './domain/model/ndc';
// controllers
import rootController from './adapters/blog/root.ctrl'
import bankController from './adapters/blog/bank.ctrl'
import calculateController from './adapters/blog/calculate.ctrl'
import chatController from './adapters/blog/chat.ctrl'
import selectController from './adapters/blog/select.ctrl'
import planController from './adapters/blog/plan.ctrl'
import interfaceController from './adapters/blog/interface.ctrl'
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
     * Services
     */
    MakeStoryService.initialize(chatGpt)
    TranslateOccupationService.initialize(chatGpt)
    /**
     * models
     */
    // chatModel.initialize(chatGpt)
    selectModel.initialize(firestore)
    locationModel.initialize(firestore)
    bankModel.initialize({
        selectModel
    })
    planModel.initialize(firestore)
    jcicModel.initialize({
        selectModel,
        firestore,
        locationModel
    })
    ndcModel.initialize(firestore)

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
