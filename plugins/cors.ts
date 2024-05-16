import HyperExpress from 'hyper-express';
const corsRouter = new HyperExpress.Router();

// Binds a midddleware that will run on all routes that begin with '/api' in this router.
corsRouter.use('/', (request, response, next) => {
    console.log('test')
    next()
    // some_async_operation(request, response)
    //     .then(() => next()) // Calling next() will trigger iteration to the next middleware
    //     .catch((error) => next(error)) // passing an Error as a parameter will automatically trigger global error handler
});
export default corsRouter