const { Contact } = require('../../models/contact');

const addContact = async (req, res) => {
  console.log(req.user._id);
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });
  console.log(contact);
  res.status(201).json(contact);
};

module.exports = addContact;
