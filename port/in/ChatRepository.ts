export interface MakeStoryUseCase {
    makeStory: (arg0: string) => Promise<string>
}

export interface translateUseCase {
    translate: (arg0: string[]) => Promise<string[]>
}