import HyperExpress from 'hyper-express'
import getPlanEntity from '../entities/plan'
const router = new HyperExpress.Router()
router.get('/interface/plan', async function (req, res) {
    try {
        const planForm = await getPlanEntity()
        res.json(planForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router