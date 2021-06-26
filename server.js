const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');

// Importing Routes
const loginRouter = require('./Routes/loginRoute');
const randomSongRouter = require('./Routes/randomSongRoute');
const playerRouter = require('./Routes/playerRoute');
const userRouter = require('./Routes/userRouter');

app = express();

// Middlewares
app.use(express.json()); // To get body in req object.
app.use(cookieParser()); // To manage client side cookies.
app.use(cors()); // To manage cors policy to accept requests from clients.  TODO: Add all the addresses of client side.

app.use('/api/random', randomSongRouter);
app.use('/api/login', loginRouter);
app.use('/api', playerRouter);
app.use('/api/user', userRouter);

app.listen(8000, () => {
  console.log('server is up');
});
