const time = new Date().getTime()
require('dotenv').config()
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
import sitcaModel from './models/sitca';
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
    const OPENAI_API_KEY = await googleCloud.accessLatestSecretVersion('OPENAI_API_KEY')
    const FIREBASE_SERVICE_ACCOUNT_KEY_JSON = await googleCloud.accessLatestSecretVersion('FIREBASE_SERVICE_ACCOUNT_KEY_JSON')
    // plugins
    await firebase.initializeSync(FIREBASE_SERVICE_ACCOUNT_KEY_JSON)
    chatGpt.initializeSync(OPENAI_API_KEY)
    const firestore = firebase.firestore
    // models
    const selectPromise = selectModel.initializeSync(firestore)
    const locationPromise = locationModel.initializeSync(firestore)
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
    sitcaModel.initialize()
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
    await Promise.all([
        selectPromise,
        locationPromise
    ])
    await webserver.listen(8080)
    const timeEnd = new Date().getTime()
    const timeDiff = (timeEnd - time) / 1000
    Object.assign(webserver.locals, { // 將locals當作decorate使用
        firebase,
        chatGpt,
        startupTime: timeDiff,
    })
    console.log(`Webserver started in ${timeDiff}s`)
})()
