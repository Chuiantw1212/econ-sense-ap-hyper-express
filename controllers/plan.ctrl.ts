import HyperExpress from 'hyper-express'
import planModel from '../models/plan'
import firebase from '../plugins/firebase'
import bankModel from '../models/bank'
import type { IPlan } from '../interfaces/plan'
const router = new HyperExpress.Router()
router.put('/plan/profile', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeProfile(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/plan/career', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeCareer(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/plan/retirement', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeRetirement(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/plan/estatePrice', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeEstatePrice(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/plan/estateSize', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeEstateSize(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/plan/estate', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeMortgage(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/plan/spouse', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeSpouse(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/plan/parenting', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeParenting(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/plan/security', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeInvestment(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.post('/plan/new', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userForm: IPlan = await planModel.addNewPlan(user.uid)
        const interestRate = await bankModel.getInterestRate()
        if (userForm.estate) {
            userForm.estate.interestRate = interestRate
        }
        res.json(userForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.get('/plan/type', async function (req, res) {
    try {
        const userForm = await planModel.getPlanForm()
        res.json(userForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.get('/plan', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userForm = await planModel.getPlan(user.uid)
        res.json(userForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})

// deprecated
router.put('/user/profile', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeProfile(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.put('/user/career', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeCareer(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.put('/user/retirement', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeRetirement(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.put('/user/estatePrice', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeEstatePrice(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.put('/user/estateSize', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeEstateSize(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.put('/user/estate', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeMortgage(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.put('/user/spouse', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeSpouse(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.put('/user/parenting', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeParenting(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.put('/user/security', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await planModel.mergeInvestment(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.post('/user/new', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userForm: IPlan = await planModel.addNewPlan(user.uid)
        const interestRate = await bankModel.getInterestRate()
        if (userForm.estate) {
            userForm.estate.interestRate = interestRate
        }
        res.json(userForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.get('/user/type', async function (req, res) {
    try {
        const userForm = await planModel.getPlanForm()
        res.json(userForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
// deprecated
router.get('/user', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userForm = await planModel.getPlan(user.uid)
        res.json(userForm)
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router