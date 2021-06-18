const express = require('express');

// Importing Controller
const loginController = require('../Controllers/songController');

const randomSongRouter = express.Router();

randomSongRouter.route('/').get(loginController.getRandomSongData);
randomSongRouter.route('/:videoId').get(loginController.streamRandomSong);

module.exports = randomSongRouter;
