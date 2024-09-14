import HyperExpress from 'hyper-express'
import GetPlanInterfaceService from '../domain/service/GetPlanInterface'
const router = new HyperExpress.Router()
router.get('/interface/plan', async function (req, res) {
    try {
        const planForm = await GetPlanInterfaceService.getPlanInterface()
        res.json(planForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router