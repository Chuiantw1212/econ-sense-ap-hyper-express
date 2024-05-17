import HyperExpress from 'hyper-express'
import ndcModel from '../models/ndc'
import jcicModel from '../models/jcic'
const router = new HyperExpress.Router()
router.post('/calculate/lifeExpectancy', async function (req, res) {
    try {
        const lifeExpectancy = await ndcModel.calculateLifeExpectancy(req.body as any)
        res.send(JSON.stringify(lifeExpectancy))
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.post('/calculate/unitPrice', async function (req, res) {
    try {
        const result = await jcicModel.calculateUnitPrice(req.body as any)
        res.send(JSON.stringify(result))
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router