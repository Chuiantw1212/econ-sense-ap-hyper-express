import HyperExpress from 'hyper-express'
import planModel from '../drivers/models/plan'
const router = new HyperExpress.Router()
router.get('/type/plan', async function (req, res) {
    try {
        const planForm = await planModel.getPlanForm()
        res.json(planForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})