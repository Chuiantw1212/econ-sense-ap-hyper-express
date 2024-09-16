import HyperExpress from 'hyper-express'
import planModel from '../../domain/model/plan'
import firebase from '../firebase.out'
import bankModel from '../../domain/model/bank'
import PlanEntity from '../../entities/plan'
import type { IPlan } from '../../entities/plan'
const router = new HyperExpress.Router()

/**
 * Middleware用法
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
        const userPart = await req.json()
        await planModel.mergeProfile(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/career', async function (req, res) {
    try {
        const userPart = await req.json()
        await planModel.mergeCareer(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/retirement', async function (req, res) {
    try {
        const userPart = await req.json()
        await planModel.mergeRetirement(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/estatePrice', async function (req, res) {
    try {
        const userPart = await req.json()
        await planModel.mergeEstatePrice(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/estateSize', async function (req, res) {
    try {
        const userPart = await req.json()
        await planModel.mergeEstateSize(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/estate', async function (req, res) {
    try {
        const userPart = await req.json()
        await planModel.mergeMortgage(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/spouse', async function (req, res) {
    try {
        const userPart = await req.json()
        await planModel.mergeSpouse(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/parenting', async function (req, res) {
    try {
        const userPart = await req.json()
        await planModel.mergeParenting(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.put('/plan/security', async function (req, res) {
    try {
        const userPart = await req.json()
        await planModel.mergeInvestment(req.locals.user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})

router.post('/plan/new', async function (req, res) {
    try {
        const planEntity = new PlanEntity()
        const planForm: IPlan = await planModel.addNewPlan(req.locals.user.uid, planEntity)
        const interestRate = await bankModel.getInterestRate()
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