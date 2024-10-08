import HyperExpress from 'hyper-express'
import { ILocals } from '../../entities/app.js'

const router = new HyperExpress.Router()

router.post('/finance/lifeExpectancy', async function (req, res) {
    try {
        const locals = req.app.locals as ILocals
        const body = await req.json()
        const lifeExpectancy = await locals.GetLifeExpectancyService.getLifeExpectancy(body)
        res.json(lifeExpectancy)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.post('/finance/unitPrice', async function (req, res) {
    try {
        const locals = req.app.locals as ILocals
        const body = await req.json()
        const result = await locals.GetEstateUnitPriceService.getEstateUnitPrice(body)
        res.json(result)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.post('/calculate/lifeExpectancy', async function (req, res) {
    try {
        const locals = req.app.locals as ILocals
        const body = await req.json()
        const lifeExpectancy = await locals.GetLifeExpectancyService.getLifeExpectancy(body)
        res.json(lifeExpectancy)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.post('/calculate/unitPrice', async function (req, res) {
    try {
        const locals = req.app.locals as ILocals
        const body = await req.json()
        const result = await locals.GetEstateUnitPriceService.getEstateUnitPrice(body)
        res.json(result)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router