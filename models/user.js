const { Schema, model } = require('mongoose');
const Joi = require('joi');

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const regiserSchemaUser = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(regexEmail).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const loginSchemaUser = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(regexEmail).required(),
});

const schemasJoi = { regiserSchemaUser, loginSchemaUser };

const usersSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: regexEmail,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamp: true }
);
usersSchema.post('save', (error, data, next) => {
  const { name, code } = error;
  const status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  error.status = status;
  next();
});

const User = model('user', usersSchema);

module.exports = { User, schemasJoi };
