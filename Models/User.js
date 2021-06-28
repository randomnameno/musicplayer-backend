const admin = require('firebase-admin');
const serviceAccount = require('../Config/Firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const FieldValue = admin.firestore.FieldValue;
const db = admin.firestore();

class User {
  constructor(email, name) {
    this.name = name;
    this.email = email;
    this.likedSongs = [];

    this.checkInFireStore = async () => {
      try {
        const userRef = db.collection('users').doc(this.email);
        const doc = await userRef.get();
        return doc.exists;
      } catch (error) {
        console.error('Unable to run checkInFireStore! ' + error);
      }
    };

    this.addToFirestore = async () => {
      try {
        const isUserPresent = await this.checkInFireStore();
        if (!isUserPresent) {
          const userRef = db.collection('users').doc(this.email);
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

    this.addLikedSong = async (songId) => {
      const userRef = db.collection('users').doc(this.email);
      await userRef.update({
        likedSongs: FieldValue.arrayUnion(songId),
      });
    };

    this.removeLikedSong = async (songId) => {
      const userRef = db.collection('users').doc(this.email);
      await userRef.update({
        likedSongs: FieldValue.arrayRemove(songId),
      });
    };
  }

  static async getUserInfo(email) {
    try {
      const userRef = db.collection('users').doc(email);
      const doc = await userRef.get();
      if (doc.exists) {
        const data = doc.data();
        const user = new User(data.email, data.name);
        user.likedSongs = data.likedSongs;
        return user;
      } else {
        console.log('User does not exists');
        return null;
      }
    } catch (error) {
      console.log('Unable to get User Info: ' + error);
      return null;
    }
  }
}

module.exports = User;
