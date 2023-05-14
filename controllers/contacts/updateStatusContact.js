const { Contact } = require('../../models/contact');

const { HttpError } = require('../../helpers');
const { updateFavoriteSchema } = require('../../schemas');

const updateStatusContact = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, 'missing field favorite');
  }
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw new HttpError(404, 'Not found');
  }
  res.status(200).json(contact);
};

module.exports = updateStatusContact;
