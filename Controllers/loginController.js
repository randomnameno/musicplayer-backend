const User = require('../Models/User');
const { verifyGoogleToken } = require('../Config/verifyToken');

const handleUserLogin = async (req, res) => {
  // Getting the token.
  if (!req.headers['authorization']) {
    // If Authorization header is not found then sending back the response.
    res.json({
      success: false,
      message: 'Authorization header is not present.',
    });
  }
  const token = req.headers['authorization'].split(' ')[1];

  try {
    // Verifying the token.
    const payload = await verifyGoogleToken(token);

    if (payload.email_verified) {
      // Creating user object.
      let user = new User(payload.email, payload.name);

      // Adding user to Firestore.
      await user.addToFirestore();

      res.json({
        isEmailVerified: payload.email_verified,
        email: payload.email,
        name: payload.name,
        userIcon: payload.picture,
      });
    }
  } catch (error) {
    console.log(`This error is in handleLogin: ${error}`);
    res.json({
      isEmailVerified: false,
    });
  }
};

module.exports.handleUserLogin = handleUserLogin;
