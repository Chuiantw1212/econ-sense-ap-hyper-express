import HyperExpress from 'hyper-express'
import locationModel from '../../domain/model/location'
import selectModel from '../../domain/model/select'
const router = new HyperExpress.Router()
router.get('/select', async function (req, res) {
    try {
        const countiesAndTownMap = await locationModel.getCountiesAndTowns()
        const selectOptionsMap = await selectModel.getOptionsMap()
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