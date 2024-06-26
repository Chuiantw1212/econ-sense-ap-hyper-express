import HyperExpress from 'hyper-express'
import chatGpt from '../plugins/chatGpt'
const router = new HyperExpress.Router()
router.post('/chat/story', async function (req, res) {
    try {
        const input = await req.text()
        const output = await chatGpt.makeStory(input)
        res.send(output)
    } catch (error: any) {
        console.log(error.message || error)
        res.send(error.message || error)
    }
})
export default router