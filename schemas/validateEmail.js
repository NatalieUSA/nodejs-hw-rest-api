const Joi = require('joi');

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const addSchemaEmail = Joi.object({
  email: Joi.string().pattern(regexEmail).required(),
});

module.exports = addSchemaEmail;
