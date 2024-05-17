const time = new Date().getTime()
require('dotenv').config()
import HyperExpress from 'hyper-express';
// plugins
import firebase from './plugins/firebase'
import googleCloud from './plugins/googleCloud'
import corsRouter from './plugins/cors'
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
// 初始化server
(async () => {
    const webserver = new HyperExpress.Server()
    const OPENAI_API_KEY = await googleCloud.accessLatestSecretVersion('OPENAI_API_KEY')
    const FIREBASE_SERVICE_ACCOUNT_KEY_JSON = await googleCloud.accessLatestSecretVersion('FIREBASE_SERVICE_ACCOUNT_KEY_JSON')
    // plugins
    await firebase.initializeSync(FIREBASE_SERVICE_ACCOUNT_KEY_JSON)
    chatGpt.initializeSync(OPENAI_API_KEY)
    const firestore = firebase.firestore
    webserver.use('/', corsRouter)
    // models
    await selectModel.initializeSync(firestore)
    bankModel.initialize({
        selectModel
    })
    userModel.initialize(firestore)
    locationModel.initialize(firestore)
    jcicModel.initialize({
        selectModel,
        firestore,
        locationModel
    })
    ndcModel.initialize(firestore)
    // controllers
    webserver.use('/', rootController)
    webserver.use('/', bankController)
    webserver.use('/', calculateController)
    webserver.use('/', chatController)
    webserver.use('/', selectController)
    try {
        await webserver.listen(8080)
        const timeEnd = new Date().getTime()
        const timeDiff = (timeEnd - time) / 1000
        // 將locals當作decorate使用
        Object.assign(webserver.locals, {
            firebase,
            chatGpt,
            startupTime: timeDiff,
        })
        console.log(`Webserver started in ${timeDiff}s`)
    } catch (error) {
        console.log('Failed to start webserver on port 80')
    }
})()
