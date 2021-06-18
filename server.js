const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');

// Importing Routes
const loginRouter = require('./Routes/loginRoute');
const randomSongRouter = require('./Routes/randomSongRoute');

app = express();

// Middlewares
app.use(express.json()); // To get body in req object.
app.use(cookieParser()); // To manage client side cookies.
app.use(cors()); // To manage cors policy to accept requests from clients.  TODO: Add all the addresses of client side.

app.use('/api/random', randomSongRouter);
app.use('/api/login', loginRouter);

<<<<<<< HEAD
app.post('/login', loginController.handleLogin);
// app.get('/music',musicController.getMusic);
=======
>>>>>>> 57d82b67eb0a2425343f48e4f8a4055e7b0e1740
app.listen(8000, () => {
  console.log('server is up');
});
