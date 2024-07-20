const Joi = require('joi');

exports.registerSchema = Joi.object({
  userName: Joi.string().required().trim(),
  password: Joi.string()
    .required()
    // regex pattern
    .pattern(/^[a-zA-Z0-9]{6,}$/),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).strip(),
  email: Joi.string().email({ tlds: false }),
  profileImage: Joi.string().uri(),
  birthDate: Joi.date().required(),
});

exports.loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});
