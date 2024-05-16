import { GoogleCloudPlugin } from './googleCloud'
export class ChatGptPlugin {
    instance: any
    googleCloud: GoogleCloudPlugin = null as any
    async initializeSync(googleCloud: any) {
        try {
            this.googleCloud = googleCloud
            const { ChatGPTAPI } = await import('chatgpt')
            const apiKey = await this.googleCloud.accessLatestSecretVersion('OPENAI_API_KEY')
            const instance: any = new ChatGPTAPI({
                apiKey,
            })
            instance.sendMessage('請為我美化每則獨立故事。')
            this.instance = instance
        } catch (error: any) {
            console.log(error.message || error)
        }
    }
    async makeStory(story: string) {
        if (!this.instance) {
            throw 'ChatGpt初始化失敗！'
        }
        const res = await this.instance.sendMessage(`
            請用中文，以第二人稱視角，將以下的故事內容擴充到至少500字，並且用p標籤分段。\n\n
            ${story}
        `)
        let text = res.text
        text = text.replaceAll('```html', '')
        text = text.replaceAll('```', '')
        text = text.trim()
        return text
    }
}
const chatGpt = new ChatGptPlugin()
export default chatGpt
