const express = require('express');

// Importing Controller
const randomSongController = require('../Controllers/randomSongController');

const randomSongRouter = express.Router();

randomSongRouter.route('/').get(randomSongController.getRandomSongData);
randomSongRouter.route('/:videoId').get(randomSongController.streamRandomSong);

module.exports = randomSongRouter;
