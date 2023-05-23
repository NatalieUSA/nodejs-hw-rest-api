const express = require('express');
const { validateBody, auth, upload } = require('../../middlewares');
const { schemasJoi } = require('../../models/user');

const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require('../../controllers/users');

const router = express.Router();

router.post('/register', validateBody(schemasJoi.regiserSchemaUser), register);
router.get('/verify/:verificationToken', verifyEmail);
router.post('/verify', resendVerifyEmail);
router.post('/login', validateBody(schemasJoi.loginSchemaUser), login);
router.get('/current', auth, getCurrent);
router.post('/logout', auth, logout);
router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);

module.exports = router;
