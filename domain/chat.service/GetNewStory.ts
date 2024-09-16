import Adapter from '../../adapters/chatGpt.out'
import type { MakeStoryUseCase } from '../../port/in/ChatUseCases'
class GetNewStoryService implements MakeStoryUseCase {
    adapter: typeof Adapter = null as any
    constructor(adapter: typeof Adapter) {
        this.adapter = adapter
    }
    async makeStory(story: string) {
        if (!this.adapter) {
            throw 'ChatGpt初始化失敗！'
        }
        const res = await this.adapter.sendMessage(`
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
}
export default GetNewStoryService