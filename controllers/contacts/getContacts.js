const { Contact } = require('../../models/contact');

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(req.query);
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, '-updateAt', {
    skip,
    limit,
  }).populate('owner', 'email');
  res.status(200).json(contacts);
};

module.exports = getContacts;
