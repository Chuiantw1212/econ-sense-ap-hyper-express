import { SendMessagePort } from '../port/out/ChatGptPorts'
interface SendMessageOptions {
    /** The name of a user in a multi-user chat. */
    name?: string;
    parentMessageId?: string;
    conversationId?: string;
    messageId?: string;
    stream?: boolean;
    systemMessage?: string;
    timeoutMs?: number;
    abortSignal?: AbortSignal;
};
type Role = 'user' | 'assistant' | 'system';
interface ChatMessage {
    id: string;
    text: string;
    role: Role;
    name?: string;
    delta?: string;
    detail?: any;
    parentMessageId?: string;
    conversationId?: string;
}
export class ChatGptAdapter implements SendMessagePort {
    chatRepository: any // chatRepository
    async initializeSync(apiKey: string) {
        try {
            const { ChatGPTAPI } = await import('chatgpt')
            const chatRepository: any = new ChatGPTAPI({
                apiKey,
                // completionParams: {
                //     "model": "gpt-4o",
                // }
            })
            this.chatRepository = chatRepository
        } catch (error: any) {
            console.log(error.message || error)
        }
    }
    async sendMessage(message: string) {
        const sendMessageOptions: SendMessageOptions = {
            timeoutMs: 15 * 1000
        }
        const res: ChatMessage = await this.chatRepository.sendMessage(message, sendMessageOptions)
        return res.text
    }
}
const chatGpt = new ChatGptAdapter()
export default chatGpt
