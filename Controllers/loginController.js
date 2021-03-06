const { OAuth2Client } = require('google-auth-library');
const FirestoreClient = require('../firestoreClient');
const CLIENT_ID =
'390511031158-234aa4gmc6oadsj6inuku9hi9f6ug8vq.apps.googleusercontent.com';

const email = '';
const handleUserLogin = async (req, res) => {
  // Creating a OAuth2Client object.
  const user = new OAuth2Client(CLIENT_ID);
  const tokenId = req.body.tokenId;

  try {
    // Verifying the tokenId received from the client.
    const response = await user.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    });

    // Fetching the payload from the token.
    const payload = response.getPayload();

    if (payload.email_verified === true) {
      await FirestoreClient.save(
        'users',
        {
          name: payload.name,
          email: payload.email,
          likedSongs:[]
        },
        payload.email

      );
      res.json({
        email:payload.email,
        name: payload.name,
        userIcon: payload.picture,
        isEmailVerified: payload.email_verified,
      });
    }
  } catch (error) {
    console.log(`This error is in handleLogin: ${error}`);
  }
};

const retUserEmail = (req,res) => {
  res.send(email);
}

module.exports.handleUserLogin = handleUserLogin;
module.exports.retUserEmail = retUserEmail;
