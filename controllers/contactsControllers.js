const { Contact } = require('../models/contact');

const Joi = require('joi');

const { HttpError, controllerWrapper } = require('../helpers');

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  // const contact = await Contact.findOne({ _id: id });
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, `Contact with id - ${contactId} - not found`);
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
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
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, 'missing field favorite');
  }
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(contact);
};

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getContactById: controllerWrapper(getContactById),
  removeContact: controllerWrapper(removeContact),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
