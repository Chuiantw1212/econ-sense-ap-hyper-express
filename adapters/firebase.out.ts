import admin from "firebase-admin"
import { getAuth, Auth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getStorage, Storage, } from 'firebase-admin/storage'
export class FirebaseAdapter {
    firestore: Firestore = null as any
    auth: Auth = null as any
    bucketPublic: ReturnType<Storage['bucket']> = null as any
    async initializeSync(apiKey: string) {
        const credential = admin.credential.cert(apiKey)
        admin.initializeApp({
            credential
        })
        /**
         * 使用public storage
         * https://firebase.google.com/docs/storage/admin/start
        */
        const firebaseStorage: Storage = getStorage()
        this.bucketPublic = firebaseStorage.bucket('public.econ-sense.com')
        /**
         * 管理Firebase使用者
         * https://firebase.google.com/docs/auth/admin/manage-users
        */
        this.auth = getAuth()
        /**
         * 使用Firestore(noSQL)
         * https://firebase.google.com/docs/firestore/quickstart
         */
        const firestore = getFirestore();
        return firestore
    }
    async verifyIdToken(idToken: string) {
        if (!idToken) {
            throw 'idToken is not given.'
        }
        const replacedToken = idToken.replace('Bearer ', '')
        const decodedToken = await this.auth.verifyIdToken(replacedToken)
        if (!decodedToken) {
            throw '未知的用戶'
        }
        return decodedToken
    }
}
const firebase = new FirebaseAdapter()
export default firebase