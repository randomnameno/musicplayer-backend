const Firestore = require('@google-cloud/firestore');
const admin = require('firebase-admin');
const admin_settings = require('./music-player-d559d-firebase-adminsdk-6pscz-c08aa54f5b.json'); 
const path = require('path');

admin.initializeApp({
    credential: admin.credential.cert(admin_settings),
    databaseURL: 'https://music-player-d559d.firebaseio.com'
  });


class FirestoreClient {
    constructor() {
        this.Firestore = new Firestore({
            projectId: 'music-player-d559d',
            keyFilename: path.join(__dirname,'./music-player-d559d-firebase-adminsdk-6pscz-c08aa54f5b.json')
        })
    }

    async addLiked(collection,data,docname) {

        const db = admin.database();
        console.log(db);
        const ref = db.collection(collection).doc(docname);
        console.log(docname);
        console.log('land' + ref);
        const docRef = this.Firestore.collection(collection).doc(docname);
        const updatedSongs = await ref.update({
            likedSongs:admin.firestore.FieldValue.arrayUnion(data.songName)
        });
    }

    async save(collection, data, docName) {
        const docRef = this.Firestore.collection(collection).doc(docName);
        await docRef.set(data);
    }
}

module.exports = new FirestoreClient;