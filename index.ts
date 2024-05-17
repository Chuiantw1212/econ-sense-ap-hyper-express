const time = new Date().getTime()
require('dotenv').config()
console.log(process.env.MODE)
import HyperExpress from 'hyper-express';
// plugins
import firebase from './plugins/firebase'
import googleCloud from './plugins/googleCloud'
import corsRouter from './plugins/cors'
import chatGpt from './plugins/chatGpt'
// models
import selectModel from './models/select';
// controllers
import rootRouter from './controllers/root'
(async () => {
    const webserver = new HyperExpress.Server()
    const OPENAI_API_KEY = await googleCloud.accessLatestSecretVersion('OPENAI_API_KEY')
    const FIREBASE_SERVICE_ACCOUNT_KEY_JSON = await googleCloud.accessLatestSecretVersion('FIREBASE_SERVICE_ACCOUNT_KEY_JSON')
    // plugins
    await firebase.initializeSync(FIREBASE_SERVICE_ACCOUNT_KEY_JSON)
    chatGpt.initializeSync(OPENAI_API_KEY)
    // models
    await selectModel.initializeSync({
        firebase
    })
    // register routers
    webserver.use('/', corsRouter)
    webserver.use('/', rootRouter)
    try {
        await webserver.listen(8080)
        console.log('Webserver started on port 80')
        const timeEnd = new Date().getTime()
        const timeDiff = (timeEnd - time) / 1000
        // 將locals當作decorate使用
        Object.assign(webserver.locals, {
            firebase,
            chatGpt,
            startupTime: timeDiff,
            // env: {
            //     NODE_ENV: 'development',
            //     ORIGIN: 'localhost:5173',
            // }
        })
    } catch (error) {
        console.log('Failed to start webserver on port 80')
    }
})()
