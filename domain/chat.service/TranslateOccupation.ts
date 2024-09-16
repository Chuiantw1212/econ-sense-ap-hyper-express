import type { translateUseCase } from '../../port/in/ChatUseCases'
import ChatGptAdapter from '../../adapters/chatGpt.out'
class TranslateOccupationService implements translateUseCase {
    chatGptInstance: typeof ChatGptAdapter = null as any
    initialize(chatGptInstance: any) {
        this.chatGptInstance = chatGptInstance
    }
    async translate(labels: string[]) {
        const labelStrings = labels.join('||')
        const res: string = await this.chatGptInstance.sendMessage(`Translate english by Taiwanese. Ensure translations contains only the common naming convention in Taiwan and fully translated into zh-TW. \n\n
            ${labelStrings}`
        )
        const options = res.split('||')
        if (labels.length !== options.length) {
            const emptyResult = labels.map(() => '')
            return emptyResult
        }
        return options.map(label => {
            return String(label).trim()
        })
    }
}
export default new TranslateOccupationService()