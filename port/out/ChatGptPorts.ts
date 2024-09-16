export interface SendMessagePort {
    sendMessage: (arg0: string) => Promise<string>
}