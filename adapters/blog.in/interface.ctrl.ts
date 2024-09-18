import HyperExpress from 'hyper-express'
import { ILocals } from '../../entities/app.js'
const router = new HyperExpress.Router()
/**
 * Deprecated, 合併到meta
 */
router.get('/interface/plan.js', async function (req, res) {
    try {
        const { GetPlanEntityService } = req.app.locals as ILocals
        const planForm = await GetPlanEntityService.getPlanEntity()
        res.json(planForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router