const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { HttpError } = require('../helpers');

const { SECRET_KEY } = process.env;

const autenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(new HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    // console.log(user, 'autenticate');
    if (!user) {
      next(new HttpError(401, 'Not authorized'));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new HttpError(401));
  }
};

module.exports = { autenticate };
