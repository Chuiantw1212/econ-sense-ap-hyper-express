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
export class ChatGptAdapter {
    chatGptApi: any
    async initializeSync(apiKey: string) {
        try {
            const { ChatGPTAPI } = await import('chatgpt')
            const chatGptApi: any = new ChatGPTAPI({
                apiKey,
            })
            this.chatGptApi = chatGptApi
        } catch (error: any) {
            console.log(error.message || error)
        }
    }
    async sendMessage(message: string) {
        const sendMessageOptions: SendMessageOptions = {
            timeoutMs: 15 * 1000
        }
        const res: ChatMessage = await this.chatGptApi.sendMessage(message, sendMessageOptions)
        return res.text
    }
}
const chatGpt = new ChatGptAdapter()
export default chatGpt
