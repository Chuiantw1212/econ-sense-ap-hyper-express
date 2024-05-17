import HyperExpress from 'hyper-express'
import userModel from '../models/user'
import firebase from '../plugins/firebase'
import bankModel from '../models/bank'
import type { IUser } from '../types/user'
const router = new HyperExpress.Router()
router.put('/user/profile', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await userModel.mergeProfile(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/user/career', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await userModel.mergeCareer(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/user/retirement', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await userModel.mergeRetirement(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/user/estatePrice', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await userModel.mergeEstatePrice(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/user/estateSize', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await userModel.mergeEstateSize(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/user/estate', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await userModel.mergeMortgage(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/user/spouse', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await userModel.mergeSpouse(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/user/parenting', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await userModel.mergeParenting(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.put('/user/security', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userPart = await req.json()
        await userModel.mergeInvestment(user.uid, userPart)
        res.send()
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.post('/user/new', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userForm: IUser = await userModel.addNewUser(user.uid)
        const interestRate = await bankModel.getInterestRate()
        if (userForm.estate) {
            userForm.estate.interestRate = interestRate
        }
        res.send(JSON.stringify(userForm))
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.get('/user/type', async function (req, res) {
    try {
        const userForm = await userModel.getUserForm()
        res.send(JSON.stringify(userForm))
    } catch (error: any) {
        res.send(error.message || error)
    }
})
router.get('/user', async function (req, res) {
    try {
        const idToken = req.headers.authorization || ''
        const user = await firebase.verifyIdToken(idToken)
        const userForm = await userModel.getUser(user.uid)

        res.send(JSON.stringify(userForm))
    } catch (error: any) {
        res.send(error.message || error)
    }
})
export default router