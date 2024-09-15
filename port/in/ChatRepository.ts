export default interface ChatRepopsitory {
    makeStory: (arg0: string) => string
    translate: (arg0: string[]) => string[]
}