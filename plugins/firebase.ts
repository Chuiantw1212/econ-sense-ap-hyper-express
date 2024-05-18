import admin from "firebase-admin"
import { getAuth, Auth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getStorage, Storage, } from 'firebase-admin/storage'
export class FirebasePlugin {
    firestore: Firestore = null as any
    auth: Auth = null as any
    bucketPublic: ReturnType<Storage['bucket']> = null as any
    async initializeSync(apiKey: string) {
        /**
         * 使用Secret Manager拉service account key，
         * 直得注意的是透過secret managert會抓回完整的object，
         * 如果是cloud run的secret則會是回傳JSON.stringify(object)
         */
        const credential = admin.credential.cert(apiKey)
        admin.initializeApp({
            credential
        })
        this.firestore = getFirestore();
        /**
         * https://firebase.google.com/docs/storage/admin/start
        */
        const firebaseStorage: Storage = getStorage()
        this.bucketPublic = firebaseStorage.bucket('public.econ-sense.com')
    }
    async verifyIdToken(idToken: string) {
        try {
            if (!idToken) {
                throw 'idToken is not given.'
            }
            const replacedToken = idToken.replace('Bearer ', '')
            const decodedToken = await getAuth().verifyIdToken(replacedToken)
            if (!decodedToken) {
                throw '未知的用戶'
            }
            return decodedToken
        } catch (error) {
            throw error
        }
    }
}
const firebase = new FirebasePlugin()
export default firebase