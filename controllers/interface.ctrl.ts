import HyperExpress from 'hyper-express'
import PlanEntity from '../entities/plan'
const router = new HyperExpress.Router()
router.get('/interface/plan', async function (req, res) {
    try {
        const planForm = await new PlanEntity()
        res.json(planForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router