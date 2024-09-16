import HyperExpress from 'hyper-express'
import locationModel from '../../domain/location.model'
import selectModel from '../../domain/select.model'
const router = new HyperExpress.Router()
/**
 * Deprecated, 合併到meta
 */
router.get('/select', async function (req, res) {
    try {
        const locals = req.app.locals as any
        const countiesAndTownMap = await locationModel.getCountiesAndTowns()
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