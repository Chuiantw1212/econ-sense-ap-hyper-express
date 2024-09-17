import type { translateUseCase } from '../../port/in/ChatUseCases'
import Adapter from '../../adapters/chatGpt.out'
class GetTranslationService implements translateUseCase {
    adapter: typeof Adapter = null as any
    constructor(adapter: typeof Adapter) {
        this.adapter = adapter
    }
    async translate(labels: string[]) {
        const labelStrings = labels.join('||')
        const res: string = await this.adapter.sendMessage(`Translate english by Taiwanese. Ensure translations contains only the common naming convention in Taiwan and fully translated into zh-TW. \n\n
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
export default GetTranslationService