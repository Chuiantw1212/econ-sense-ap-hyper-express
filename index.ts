import HyperExpress from 'hyper-express';
import rootRouter from './controllers/root'
const webserver = new HyperExpress.Server();
webserver.use('/', rootRouter)
// Activate webserver by calling .listen(port, callback);
webserver.listen(8080)
    .then((socket) => console.log('Webserver started on port 80'))
    .catch((error) => console.log('Failed to start webserver on port 80'));

export default webserver