const jwtService = require('../services/jwt-service');
const userService = require('../services/user-service');
const createError = require('../utils/create-error');

const authenticate = async (req, res, next) => {
  try {
    // get Bearer token
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      createError({
        message: 'unauthenticate',
        statusCode: 401,
      });
    }
    // [Bearer , token]
    const accessToken = authorization.split(' ')[1];
    // verify token
    const payload = jwtService.verify(accessToken);
    // find user by payload id
    const user = await userService.findUserbyId(payload.id);
    if (!user) {
      createError({
        message: 'user not found',
        statusCode: 400,
      });
    }

    // password shouldn't show in client side
    delete user.password;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
