const time = new Date().getTime()
import HyperExpress from 'hyper-express';
import rootRouter from './controllers/root'
import corsRouter from './plugins/cors'

(async () => {
    const webserver = new HyperExpress.Server();
    webserver.use('/', rootRouter)
    webserver.use('/', corsRouter)
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
