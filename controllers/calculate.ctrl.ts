import HyperExpress from 'hyper-express'
import ndcModel from '../drivers/repositories/ndc'
import jcicModel from '../drivers/repositories/jcic'
const router = new HyperExpress.Router()
router.post('/calculate/lifeExpectancy', async function (req, res) {
    try {
        const body = await req.json()
        const lifeExpectancy = await ndcModel.calculateLifeExpectancy(body)
        res.json(lifeExpectancy)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.post('/calculate/unitPrice', async function (req, res) {
    try {
        const body = await req.json()
        const result = await jcicModel.calculateUnitPrice(body)
        res.json(result)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router