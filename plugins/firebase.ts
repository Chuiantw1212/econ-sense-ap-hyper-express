import admin, { type ServiceAccount } from "firebase-admin"
import { getAuth, } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getStorage, Storage, } from 'firebase-admin/storage'
export class FirebasePlugin {
    firestore: Firestore | any
    bucketPublic: ReturnType<Storage['bucket']> | any
    async initializeSync(apiKey: string) {
        try {
            /**
             * 使用Secret Manager拉service account key，
             * 直得注意的是透過secret managert會抓回完整的object，
             * 如果是cloud run的secret則會是回傳JSON.stringify(object)
             */
            if (process.env.MODE === 'development') {
                const credential = admin.credential.cert(apiKey)
                admin.initializeApp({
                    credential
                })
            } else {
                /**
                 * Handling sensitive configuration with Secret Manager
                 * https://cloud.google.com/run/docs/tutorials/identity-platform#secret-manager
                 * https://firebase.google.com/docs/reference/admin/node/firebase-admin.credential_n.md#credentialcert
                 */
                const { FIREBASE_SERVICE_ACCOUNT_KEY_JSON = '', } = process.env
                let serviceAccountPathOrObject = {
                    project_id: '',
                    client_email: '',
                    private_key: ''
                }
                if (typeof FIREBASE_SERVICE_ACCOUNT_KEY_JSON === 'string') {
                    serviceAccountPathOrObject = JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY_JSON);
                } else {
                    serviceAccountPathOrObject = FIREBASE_SERVICE_ACCOUNT_KEY_JSON
                }
                const serviceAccountfrom: ServiceAccount = {
                    projectId: serviceAccountPathOrObject.project_id,
                    clientEmail: serviceAccountPathOrObject.client_email,
                    privateKey: serviceAccountPathOrObject.private_key
                }
                const credential = admin.credential.cert(serviceAccountfrom)
                admin.initializeApp({
                    credential,
                })
            }
            this.firestore = getFirestore();
            /**
             * https://firebase.google.com/docs/storage/admin/start
            */
            const firebaseStorage: Storage = getStorage()
            this.bucketPublic = firebaseStorage.bucket('public.econ-sense.com')
        } catch (error: any) {
            console.error(error.message || error)
            throw error
        }
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
    getPublicFiles() {
        this.bucketPublic.getFiles(function (err: any, files: []) {
            if (!err) {
                // files is an array of File objects.
                console.log(files);
            }
        });
    }
}
const firebase = new FirebasePlugin()
export default firebase
// export default fp(async function (fastify: any) {
//     await firebase.initialize()
//     fastify.decorate('firebase', firebase)
// })
