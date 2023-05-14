const express = require('express');
const { validateBody } = require('../../middlewares');
const { schemasJoi } = require('../../models/user');

const { register, login } = require('../../controllers/users/userControllers');

const router = express.Router();

router.post('/register', validateBody(schemasJoi.regiserSchemaUser), register);
router.post('/login', validateBody(schemasJoi.loginSchemaUser), login);

module.exports = router;
