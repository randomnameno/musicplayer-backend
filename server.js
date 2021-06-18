const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const loginController = require('./controllers/login-controller');
const musicController = require('./controllers/music-controller');
const logoutController = require('./controllers/logout-controller');
app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const musicRouter = express.Router();
const loginRouter = express.Router();
// const logoutRouter = express.Router();

loginRouter.route('/').post(loginController.handleLogin);
// logoutRouter.route('/').get(logoutController.handleLogout);
musicRouter.route('/').get(musicController.getMusicHandler(musicRouter));


app.use('/music', musicRouter);
app.use('/login', loginRouter);
// app.use('/logout', logoutRouter);

app.post('/login', loginController.handleLogin);
// app.get('/music',musicController.getMusic);
app.listen(8000, () => {
  console.log('server is up');
});
