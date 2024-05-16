const time = new Date().getTime()
require('dotenv').config();
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
    // plugins
    await firebase.initializeSync({
        googleCloud
    })
    chatGpt.initializeSync({
        googleCloud
    })
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
            startupTime: timeDiff
        })
    } catch (error) {
        console.log('Failed to start webserver on port 80')
    }
})()
