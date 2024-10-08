import HyperExpress from 'hyper-express'
import { ILocals } from '../../entities/app.js'

const router = new HyperExpress.Router()
router.post('/chat/story', async function (req, res) {
    try {
        const locals = req.app.locals as ILocals
        const input = await req.text()
        const output = await locals.GetNewStoryService.makeStory(input)
        res.send(output)
    } catch (error: any) {
        console.log(error.message || error)
        res.send(error.message || error)
    }
})
router.post('/chat/translate', async function (req, res) {
    try {
        const locals = req.app.locals as ILocals
        const input = await req.json()
        const output = await locals.GetTranslationService.translate(input)
        res.json(output)
    } catch (error: any) {
        console.log(error.message || error)
        res.send(error.message || error)
    }
})
export default router