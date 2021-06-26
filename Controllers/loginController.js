const { OAuth2Client } = require('google-auth-library');
const User = require('../Models/User');

const CLIENT_ID =
  '390511031158-234aa4gmc6oadsj6inuku9hi9f6ug8vq.apps.googleusercontent.com';

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
      // Creating user object.
      const user = new User(payload.email, payload.name);

      // Adding user to Firestore.
      await user.addToFirestore();

      res.json({
        email: payload.email,
        name: payload.name,
        userIcon: payload.picture,
        isEmailVerified: payload.email_verified,
      });
    }
  } catch (error) {
    console.log(`This error is in handleLogin: ${error}`);
  }
};

module.exports.handleUserLogin = handleUserLogin;
