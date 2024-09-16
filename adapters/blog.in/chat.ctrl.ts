import HyperExpress from 'hyper-express'
import MakeStoryService from '../../domain/chat/service/MakeStory'
import TranslateOccupationService from '../../domain/chat/service/TranslateOccupation'
const router = new HyperExpress.Router()
router.post('/chat/story', async function (req, res) {
    try {
        const input = await req.text()
        const output = await MakeStoryService.makeStory(input)
        res.send(output)
    } catch (error: any) {
        console.log(error.message || error)
        res.send(error.message || error)
    }
})
router.post('/chat/translate', async function (req, res) {
    try {
        const input = await req.json()
        const output = await TranslateOccupationService.translate(input)
        res.json(output)
    } catch (error: any) {
        console.log(error.message || error)
        res.send(error.message || error)
    }
})
export default router