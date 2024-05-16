const time = new Date().getTime()
require('dotenv').config();
console.log(process.env)
import HyperExpress from 'hyper-express';
// plugins
import firebase from './plugins/firebase'
import googleCloud from './plugins/googleCloud'
import corsRouter from './plugins/cors'
// controllers
import rootRouter from './controllers/root'
(async () => {
    const webserver = new HyperExpress.Server()
    firebase.initialize({
        googleCloud
    })
    Object.assign(webserver.locals, {
        firebase
    })
    // webserver.locals.firebase
    // plugins

    // webserver.use('/', corsRouter)
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
