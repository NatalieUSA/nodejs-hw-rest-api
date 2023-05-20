const { HttpError, sendEmail } = require('../../helpers');
const { User } = require('../../models/user');

const { addSchemaEmail } = require('../../schemas');
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { error } = addSchemaEmail.validate(req.body);
  if (error) {
    throw new HttpError(400, 'missing required field email');
  }
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw new HttpError(401, {
      message: 'Email not found',
    });
  }
  if (user.verify) {
    throw new HttpError(400, {
      message: 'Verification has already been passed',
    });
  }
  const resendVerifyEmail = {
    to: email,
    subject: 'Resend verify email',
    html: `<a target="_blank" href=${`${BASE_URL}/api/users/verify/${user.verificationToken}`}>Click veryfy email</a>`,
  };

  await sendEmail(resendVerifyEmail);
  res.status(200).json({ message: 'Verification email REsend' });
};

module.exports = resendVerifyEmail;
