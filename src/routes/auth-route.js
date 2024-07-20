const express = require('express');
const {
  registerValidator,
  loginValidator,
} = require('../middlewares/validator');
const authController = require('../controllers/auth-controller');
const authenticate = require('../middlewares/authenticate');

// Make new router for authenticate
const authRouter = express.Router();

// validator : check request
// controller : control data before send
authRouter.post('/register', registerValidator, authController.register);
authRouter.post('/login', loginValidator, authController.login);
authRouter.get('/me', authenticate, authController.getMe);
authRouter.patch('/:userId', authenticate, authController.updateUser);

module.exports = authRouter;
