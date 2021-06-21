const Firestore = require('@google-cloud/firestore');
const path = require('path');
class FirestoreClient {
    constructor() {
        this.Firestore = new Firestore({
            projectId: 'music-player-d559d',
            keyFilename: path.join(__dirname,'./music-player-d559d-firebase-adminsdk-6pscz-c08aa54f5b.json')
        })
    }
    async save(collection, data, docName) {
        const docRef = this.Firestore.collection(collection).doc(docName);
        await docRef.set(data);
    }
}

module.exports = new FirestoreClient;