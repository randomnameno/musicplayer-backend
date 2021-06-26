const express = require('express');

const userController = require('../Controllers/userController');

const userRouter = express.Router();
userRouter
  .route('/like')
  .put(userController.addToLikedSongs)
  .delete(userController.removeFormLikedSongs);

module.exports = userRouter;
