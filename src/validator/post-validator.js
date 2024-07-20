const Joi = require('joi');

exports.postSchema = Joi.object({
  dueDate: Joi.date().required(),
});
