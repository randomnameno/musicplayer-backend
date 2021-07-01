const { OAuth2Client } = require('google-auth-library');

// TODO: Use Environment Variables
const CLIENT_ID =
  '390511031158-234aa4gmc6oadsj6inuku9hi9f6ug8vq.apps.googleusercontent.com';

const verifyGoogleToken = async (token) => {
  try {
    // Creating a OAuth2Client object.
    const user = new OAuth2Client(CLIENT_ID);

    // Verifying the token.
    const response = await user.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    // Fetching the payload from the token.
    const payload = response.getPayload();

    return payload;
  } catch (error) {
    console.error('Could not verify the token: ' + error);
    return { email_verified: false };
  }
};

module.exports = {
  verifyGoogleToken: verifyGoogleToken,
};
