const {OAuth2Client} = require('google-auth-library');

const user = new OAuth2Client('390511031158-234aa4gmc6oadsj6inuku9hi9f6ug8vq.apps.googleusercontent.com');

exports.handleLogin = (req, res) => {
  const {tokenId} = req.body;
  // console.log(tokenId);
  user.verifyIdToken({idToken:tokenId, audience:'390511031158-234aa4gmc6oadsj6inuku9hi9f6ug8vq.apps.googleusercontent.com'})
  .then(response => {
    // console.log(response.payload);
    const payload = response.getPayload();
    if(payload.email_verified === true) {
      res.json({
        'picture': payload.picture,
        'email_verified': payload.email_verified
      })
    }
  })
  .catch(console.error);
 };

