const {OAuth2Client} = require('google-auth-library');

const user = new OAuth2Client('390511031158-234aa4gmc6oadsj6inuku9hi9f6ug8vq.apps.googleusercontent.com');


exports.handleLogin = (req, res) => {
  console.log('skratttttaaaaa');
  const {tokenId} = req.body;
  console.log(tokenId);
  user.verifyIdToken({idToken:tokenId, audience:'390511031158-234aa4gmc6oadsj6inuku9hi9f6ug8vq.apps.googleusercontent.com'})
  .then(response => {
    console.log(response.payload);
  })
  res.json({
    'verified': true,
  })
};
