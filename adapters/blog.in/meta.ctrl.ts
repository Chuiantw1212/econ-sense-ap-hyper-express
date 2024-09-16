import HyperExpress from 'hyper-express'
import { ILocals } from '../../entities/app'
import GetPlanInterfaceService from '../../domain/plan.service/GetPlanEntity'

const router = new HyperExpress.Router()
router.get('/meta/plan', async function (req, res) {
    try {
        const { GetPlanEntityService } = req.app.locals as ILocals
        const planForm = await GetPlanEntityService.getPlanEntity()
        res.json(planForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.get('/meta/select', async function (req, res) {
    try {
        const locals = req.app.locals as ILocals
        const countiesAndTownMap = await locals.GetTaiwanLocationService.getTaiwanLocations()
        const selectOptionsMap = await locals.GetOptionsService.getOptionsMap()
        const result = {
            ...countiesAndTownMap,
            ...selectOptionsMap,
        }
        res.json(result)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router