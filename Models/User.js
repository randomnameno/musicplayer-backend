const admin = require('firebase-admin');
const serviceAccount = require('../Config/Firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const FieldValue = admin.firestore.FieldValue;
const db = admin.firestore();

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.likedSongs = [];
  }

  checkInFireStore = async () => {
    try {
      const userRef = db.collection('users').doc(this.id);
      const doc = await userRef.get();
      return doc.exists;
    } catch (error) {
      console.error('Unable to run checkInFireStore! ' + error);
    }
  };

  addToFirestore = async () => {
    try {
      if (await this.checkInFireStore()) {
        const userRef = db.collection('users').doc(this.id);
        await userRef.set({
          name: this.name,
          email: this.email,
          likedSongs: this.likedSongs,
        });
      } else {
        console.log('User is already present in Firestore!');
      }
    } catch (error) {
      console.error('Unable to add User! ' + error);
    }
  };

  addLikedSong = async (songId) => {
    const userRef = db.collection('users').doc(this.songId);
    await userRef.update({
      likedSongs: FieldValue.arrayUnion(songId),
    });
  };

  removeLikedSong = async (songId) => {
    const userRef = db.collection('users').doc(this.songId);
    await userRef.update({
      likedSongs: FieldValue.arrayRemove(songId),
    });
  };
}

export default User;
