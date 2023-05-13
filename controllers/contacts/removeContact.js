const { Contact } = require('../../models/contact');

const { HttpError } = require('../../helpers');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw new HttpError(400, 'Not found');
  }

  res.status(200).json({ message: `Contact with id: ${contactId} - deleted` });
};

module.exports = removeContact;
