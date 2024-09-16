import HyperExpress from 'hyper-express'
import planModel from '../../domain/Plan.model'
import firebase from '../firebase.out'
import PlanEntity from '../../entities/plan'
import type { IPlan } from '../../entities/plan'
import { ILocals } from '../../entities/app'
const router = new HyperExpress.Router()

/**
 * 這邊示範Middleware用法
 * https://github.com/kartikk221/hyper-express/blob/master/docs/Middlewares.md
 */
router.use('/plan', async (req, res, next) => {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)

        /**
         * req.locals。非Node.js/HyperExpress/Express官方的用法，而是撰寫Node.js約定俗成的做法。
         * https://stackoverflow.com/questions/33451053/req-locals-vs-res-locals-vs-res-data-vs-req-data-vs-app-locals-in-express-mi
         */
        req.locals.user = user
        next()
    } catch (error: any) {
        console.log(error.message || error)
        next(error)
    }
});

router.put('/plan/profile', async function (req, res) {
    try {
        const { PutProfileService } = req.app.locals as ILocals
        const userPart = await req.json()
        await PutProfileService.mergeProfile(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/career', async function (req, res) {
    try {
        const { PutCareerService } = req.app.locals as ILocals
        const userPart = await req.json()
        await PutCareerService.mergeCareer(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/retirement', async function (req, res) {
    try {
        const { PutRetirementService } = req.app.locals as ILocals
        const userPart = await req.json()
        await PutRetirementService.mergeRetirement(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/estatePrice', async function (req, res) {
    try {
        const { PutEstatePriceService } = req.app.locals as ILocals
        const userPart = await req.json()
        await PutEstatePriceService.mergeEstatePrice(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/estateSize', async function (req, res) {
    try {
        const { PutEstateSizeService } = req.app.locals as ILocals
        const userPart = await req.json()
        await PutEstateSizeService.mergeEstateSize(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/estate', async function (req, res) {
    try {
        const { PutMortgageService } = req.app.locals as ILocals
        const userPart = await req.json()
        await PutMortgageService.mergeMortgage(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/spouse', async function (req, res) {
    try {
        const { PutSpouseService } = req.app.locals as ILocals
        const userPart = await req.json()
        await PutSpouseService.mergeSpouse(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/parenting', async function (req, res) {
    try {
        const { PutParentingService } = req.app.locals as ILocals
        const userPart = await req.json()
        await PutParentingService.mergeParenting(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/security', async function (req, res) {
    try {
        const { PutSecurityService } = req.app.locals as ILocals
        const userPart = await req.json()
        await PutSecurityService.mergeSecurity(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.post('/plan/new', async function (req, res) {
    try {
        const locals = req.app.locals as any
        const planEntity = new PlanEntity()
        const planForm: IPlan = await planModel.addNewPlan(req.locals.user.uid, planEntity)
        const interestRate = await locals.GetBackedInterestRateService.getInterestRate()
        if (planForm.estate) {
            planForm.estate.interestRate = interestRate
        }
        res.json(planForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.get('/plan', async function (req, res) {
    try {
        const planForm = await planModel.getPlan(req.locals.user.uid)
        res.json(planForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router