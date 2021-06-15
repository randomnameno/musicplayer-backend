const express = require('express');
const cors = require('cors');

const loginController = require('./controllers/login-controller');
const musicController = require('./controllers/music-controller');
app = express();

app.use(express.json());
app.use(cors());

const musicRouter = express.Router();
const loginRouter = express.Router();

loginRouter.route('/').post(loginController.handleLogin);
musicRouter.route('/').get(musicController.getMusicHandler(musicRouter));

app.use('/music', musicRouter);
app.use('/login', loginRouter);
// app.post('/login', loginController.handleLogin);
// app.get('/music',musicController.getMusic);
app.listen(8000, () => {
  console.log('server is up');
});
