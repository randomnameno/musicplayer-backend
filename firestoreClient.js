const Firestore = require('@google-cloud/firestore');
const admin = require('firebase-admin');

const path = require('path');
class FirestoreClient {
    constructor() {
        this.Firestore = new Firestore({
            projectId: 'music-player-d559d',
            keyFilename: path.join(__dirname,'./music-player-d559d-firebase-adminsdk-6pscz-c08aa54f5b.json')
        })
    }

    async addLiked(collection,data,docname) {
        const docRef = this.Firestore.collection(collection).doc(docname);
        await docRef.update({
            likedSongs: admin.firestore.FieldValue.arrayUnion({
                songName: data.songName,
                artistName: data.artistName,
                thumbnail: data.songThumbnail
            }),
        });
    }

    async save(collection, data, docName) {
        const docRef = this.Firestore.collection(collection).doc(docName);
        await docRef.set(data);
    }
}

module.exports = new FirestoreClient;