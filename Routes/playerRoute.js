const express = require('express');

// Importing Controller
const playerController = require('../Controllers/playerController');

playerRouter = express.Router();

playerRouter
  .route('/suggestions/:songId')
  .get(playerController.getSongSuggestions);
playerRouter.route('/stream/:songId').get(playerController.streamSong);
playerRouter.route('/search').post(playerController.getSearchResults);

module.exports = playerRouter;
