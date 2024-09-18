import HyperExpress from 'hyper-express'
import { ILocals } from '../../entities/app.js'
const router = new HyperExpress.Router()
/**
 * Deprecated, 合併到meta
 */
router.get('/select', async function (req, res) {
    try {
        const { GetTaiwanLocationService, GetOptionsService } = req.app.locals as ILocals
        const countiesAndTownMap = await GetTaiwanLocationService.getTaiwanLocations()
        const selectOptionsMap = await GetOptionsService.getOptionsMap()
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