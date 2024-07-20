const Joi = require('joi');

exports.locationSchema = Joi.object({
  image: Joi.string(),
  name: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
  address: Joi.string().required(),
});
