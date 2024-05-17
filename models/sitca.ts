
import { Firestore, Query, CollectionReference, DocumentData } from 'firebase-admin/firestore'
import axios from 'axios'
export class SitcaModel {
    initialize() {
        // this.collectionLifeExpectancy = firestore.collection('lifeExpectancies')
    }
}
const sitcaModel = new SitcaModel()
export default sitcaModel