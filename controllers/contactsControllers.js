const Joi = require('joi');

const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
} = require('../servises/contactsServises');
const { HttpError, controllerWrapper } = require('../helpers');

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
});

const listContacts = async (req, res) => {
  const contacts = await listContactsService();
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactByIdService(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id - ${contactId} - not found`);
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }
  const contact = await addContactService(req.body);
  res.status(201).json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContactService(contactId);
  if (!contact) {
    throw HttpError(400, 'Not found');
  }

  res.status(200).json({ message: `Contact with id: ${contactId} - deleted` });
};

const updateContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, 'missing fields');
  }
  const { contactId } = req.params;
  const contact = await updateContactService(contactId, req.body);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(contact);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  removeContact: controllerWrapper(removeContact),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
};
