import HyperExpress from 'hyper-express'
import { ILocals } from '../../entities/app.js'
const router = new HyperExpress.Router()
router.get('/bank/config/interestRate', async function (req, res) {
    try {
        const locals = req.app.locals as ILocals
        const interestRate: number = await locals.GetBackedInterestRateService.getBackedInterestRate()
        res.json(interestRate)
    } catch (error: any) {
        console.trace(error.message || error)
        res.send(error.message || error)
    }
})
router.get('/bank/config/portfolioIrr', async function (req, res) {
    try {
        const locals = req.app.locals as ILocals
        const portfolioIRR = await locals.GetPortfolioIRRService.getPortfolioIRR()
        res.json(portfolioIRR)
    } catch (error: any) {
        console.trace(error.message || error)
        res.send(error.message || error)
    }
})

export default router