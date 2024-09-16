import HyperExpress from 'hyper-express'
import { ILocals } from '../../entities/app'
// import GetPlanInterfaceService from '../../domain/plan.service/GetPlanInterface'
const router = new HyperExpress.Router()
/**
 * Deprecated, 合併到meta
 */
router.get('/interface/plan', async function (req, res) {
    try {
        const locals = req.app.locals as ILocals
        const planForm = await locals.GetPlanInterfaceService.getPlanEntity()
        res.json(planForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router