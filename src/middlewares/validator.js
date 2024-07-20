const { registerSchema, loginSchema } = require('../validator/auth-validator');
const { locationSchema } = require('../validator/location-validator');
const { postSchema } = require('../validator/post-validator');

exports.registerValidator = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0] });
  }
  req.input = value;
  next();
};

exports.loginValidator = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0] });
  }
  req.input = value;
  next();
};

exports.locationValidator = (req, res, next) => {
  const { value, error } = locationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0] });
  }
  req.input = value;
  next();
};

exports.postValidator = (req, res, next) => {
  const { value, error } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0] });
  }
  req.input = value;
  next();
};
