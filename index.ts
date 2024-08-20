const time = new Date().getTime()
// hyper-exoress cores
import { config } from 'dotenv'
config()
import HyperExpress from 'hyper-express';
import cors, { type CorsOptions } from 'cors'
// plugins
import firebase from './plugins/firebase'
import googleCloud from './plugins/googleCloud'
import chatGpt from './plugins/chatGpt'
// models
import selectModel from './models/select'
import bankModel from './models/bank'
import jcicModel from './models/jcic'
import locationModel from './models/location'
import userModel from './models/user';
import ndcModel from './models/ndc';
// controllers
import rootController from './controllers/root'
import bankController from './controllers/bank'
import calculateController from './controllers/calculate'
import chatController from './controllers/chat'
import selectController from './controllers/select'
import userController from './controllers/user'
// 初始化server
(async () => {
    const webserver = new HyperExpress.Server()
    // plugins
    try {
        const OPENAI_API_KEY = await googleCloud.accessSecret('OPENAI_API_KEY')
        chatGpt.initializeSync(OPENAI_API_KEY)
    } catch (error: any) {
        // 這段讀不到就算了
        console.log(error.message || error)
    }
    let FIREBASE_SERVICE_ACCOUNT_KEY_JSON = null
    try {
        FIREBASE_SERVICE_ACCOUNT_KEY_JSON = await googleCloud.accessSecret('FIREBASE_SERVICE_ACCOUNT_KEY_JSON')
    } catch (error) {
        FIREBASE_SERVICE_ACCOUNT_KEY_JSON = require("./FIREBASE_SERVICE_ACCOUNT_KEY_JSON.json");
    }

    const firestore = await firebase.initializeSync(FIREBASE_SERVICE_ACCOUNT_KEY_JSON)
    // models
    selectModel.initialize(firestore)
    locationModel.initialize(firestore)
    bankModel.initialize({
        selectModel
    })
    userModel.initialize(firestore)
    jcicModel.initialize({
        selectModel,
        firestore,
        locationModel
    })
    ndcModel.initialize(firestore)
    // controllers
    const corsConfig: CorsOptions = {
        origin: process.env.ORIGIN || 'http://localhost:5173',
    }
    webserver.use(cors(corsConfig))
    webserver.use('/', rootController)
    webserver.use('/', bankController)
    webserver.use('/', calculateController)
    webserver.use('/', chatController)
    webserver.use('/', selectController)
    webserver.use('/', userController)
    // start listening
    await webserver.listen(8080)
    const timeEnd = new Date().getTime()
    const timeDiff = (timeEnd - time) / 1000
    Object.assign(webserver.locals, { // 將locals當作decorate使用
        startupTime: timeDiff,
    })
    console.log(`Webserver started in ${timeDiff}s`)
})()
