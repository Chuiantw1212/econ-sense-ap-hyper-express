import HyperExpress from 'hyper-express'
import ndcModel from '../models/ndc'
import jcicModel from '../models/jcic'
const router = new HyperExpress.Router()
router.post('/calculate/lifeExpectancy', async function (req, res) {
    try {
        const body = await req.json()
        const lifeExpectancy = await ndcModel.calculateLifeExpectancy(body)
        res.send(JSON.stringify(lifeExpectancy))
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.post('/calculate/unitPrice', async function (req, res) {
    try {
        const body = await req.json()
        const result = await jcicModel.calculateUnitPrice(body)
        res.send(JSON.stringify(result))
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router