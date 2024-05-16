import HyperExpress from 'hyper-express';
const api_v1_router = new HyperExpress.Router();

// Create routes directly on the Router
api_v1_router.get('/', async (request, response) => {
    response.send('Hello World');
});

export default api_v1_router