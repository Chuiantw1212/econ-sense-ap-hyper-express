import HyperExpress from 'hyper-express'
import chatModel from '../drivers/repositories/chat'
const router = new HyperExpress.Router()
router.post('/chat/story', async function (req, res) {
    try {
        const input = await req.text()
        const output = await chatModel.makeStory(input)
        res.send(output)
    } catch (error: any) {
        console.log(error.message || error)
        res.send(error.message || error)
    }
})
router.post('/chat/translate', async function (req, res) {
    try {
        const input = await req.json()
        const output = await chatModel.translate(input)
        res.json(output)
    } catch (error: any) {
        console.log(error.message || error)
        res.send(error.message || error)
    }
})
export default router