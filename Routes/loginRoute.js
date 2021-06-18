const express = require('express');

// Importing Controller
const loginController = require('../Controllers/loginController');

const loginRouter = express.Router();

loginRouter.route('/').get(loginController.handleUserLogin);

module.exports = loginRouter;
