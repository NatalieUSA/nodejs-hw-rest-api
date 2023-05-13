const { Contact } = require('../../models/contact');

const { HttpError } = require('../../helpers');

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw new HttpError(404, 'Not found');
  }
  res.status(200).json(contact);
};

module.exports = updateContact;
