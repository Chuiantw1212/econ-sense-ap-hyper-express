const time = new Date().getTime()
require('dotenv').config();
import HyperExpress from 'hyper-express';
// plugins
import firebase from './plugins/firebase'
import googleCloud from './plugins/googleCloud'
import corsRouter from './plugins/cors'
// models
import selectModel from './models/select';
// controllers
import rootRouter from './controllers/root'
(async () => {
    const webserver = new HyperExpress.Server()
    await firebase.initializeSync({
        googleCloud
    })
    Object.assign(webserver.locals, {
        firebase
    })
    await selectModel.initializeSync({
        firebase
    })
    webserver.use('/', corsRouter)
    // controllers
    webserver.use('/', rootRouter)
    // Activate webserver by calling .listen(port, callback);
    try {
        await webserver.listen(8080)
        console.log('Webserver started on port 80')
        const timeEnd = new Date().getTime()
        const timeDiff = (timeEnd - time) / 1000
        Object.assign(webserver.locals, {
            startupTime: timeDiff
        })
    } catch (error) {
        console.log('Failed to start webserver on port 80')
    }
})()
