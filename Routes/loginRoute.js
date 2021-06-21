const express = require('express');

// Importing Controller
const loginController = require('../Controllers/loginController');

const loginRouter = express.Router();

loginRouter.route('/').post(loginController.handleUserLogin);
loginRouter.route('/email').get(loginController.retUserEmail);

module.exports = loginRouter;
