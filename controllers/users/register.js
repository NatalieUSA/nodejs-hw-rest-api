const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const gravatar = require('gravatar');
const { User } = require('../../models/user');
const { HttpError, sendEmail } = require('../../helpers');
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, `Email: ${email} - in use!`);
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const sendVerifyEmail = {
    to: email,
    subject: 'Verify your email address',
    html: `<strong>By clicking on the following link, you are confirming your email address <a href=${`${BASE_URL}/api/users/verify/${verificationToken}`}>VERIFY</a></strong>`,
  };

  await sendEmail(sendVerifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
