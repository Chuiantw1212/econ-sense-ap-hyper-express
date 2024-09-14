import HyperExpress from 'hyper-express'
import planModel from '../drivers/models/plan'
const router = new HyperExpress.Router()
router.get('/interface/plan', async function (req, res) {
    try {
        const planForm = await planModel.getPlanEntity()
        res.json(planForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router