const express = require('express');

const likedSongsController = require('../Controllers/likedSongsController');

const likedSongsRouter = express.Router();
likedSongsRouter.route('/').post(likedSongsController.storeLikedSongs);

module.exports = likedSongsRouter;
