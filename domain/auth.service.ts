import FirebaseAdapter from "../adapters/firebase.out"
export default class VerifyIdTokenService {
    adapter: typeof FirebaseAdapter = null as any
    constructor(firebase: typeof FirebaseAdapter) {
        this.adapter = firebase
    }
    verifyIdToken(idToken: string) {
        const decodedIdToken = this.adapter.verifyIdToken(idToken)
        return decodedIdToken
    }
}