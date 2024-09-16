import HyperExpress from 'hyper-express'
import bankModel from '../../domain/model/bank'
const router = new HyperExpress.Router()
router.get('/bank/config/interestRate', async function (req, res) {
    try {
        const interestRate: number = await bankModel.getInterestRate()
        res.json(interestRate)
    } catch (error: any) {
        console.trace(error.message || error)
        res.send(error.message || error)
    }
})
router.get('/bank/config/portfolioIrr', async function (req, res) {
    try {
        const portfolioIRR = await bankModel.getConfigByKey('ishareCoreETF')
        res.json(portfolioIRR)
    } catch (error: any) {
        console.trace(error.message || error)
        res.send(error.message || error)
    }
})

export default router