const { Contact } = require('../../models/contact');

const { HttpError } = require('../../helpers');

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new HttpError(404, `Contact with id - ${contactId} - not found`);
  }
  res.status(200).json(contact);
};

module.exports = getContactById;
