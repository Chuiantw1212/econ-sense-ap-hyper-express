import { ChatGptPlugin } from "../plugins/chatGpt"
export class ChatModel {
    chatGptInstance: ChatGptPlugin | any = null
    initialize(chatGptInstance: any) {
        this.chatGptInstance = chatGptInstance
    }
    async makeStory(story: string) {
        if (!this.chatGptInstance) {
            throw 'ChatGpt初始化失敗！'
        }
        const res = await this.chatGptInstance.sendMessage(`
            請用中文，以第二人稱視角，將以下的故事內容擴充到至少500字，並且用p標籤分段。\n\n
            ${story}
        `)
        let text = res
        text = text.replaceAll('```html', '')
        text = text.replaceAll('```', '')
        text = text.replaceAll('\n', '')
        text = text.trim()
        return text
    }
    async translate(labels: string[]) {
        const labelStrings = labels.join('||')
        const res = await this.chatGptInstance.sendMessage(`請用zh-TW為我翻譯以下英文。\n\n
            ${labelStrings}`
        )
        console.log(res)
    }
}
export default new ChatModel()