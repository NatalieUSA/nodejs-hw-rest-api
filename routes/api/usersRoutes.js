const express = require('express');
const { validateBody, autenticate } = require('../../middlewares');
const { schemasJoi } = require('../../models/user');

const {
  register,
  login,
  getCurrent,
  logout,
} = require('../../controllers/users');

const router = express.Router();

router.post('/register', validateBody(schemasJoi.regiserSchemaUser), register);
router.post('/login', validateBody(schemasJoi.loginSchemaUser), login);
router.get('/current', autenticate, getCurrent);
router.post('/logout', autenticate, logout);

module.exports = router;
