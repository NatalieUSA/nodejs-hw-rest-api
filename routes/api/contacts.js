const express = require('express');
const Joi = require('joi');
// const contacts = require('../../models/contacts');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await getContactById(contactId);
    console.log(req.params);
    console.log(result);
    if (!result) {
      throw HttpError(404, `Contact with id - ${contactId} - not found`);
    }
    res.status(200).res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) {
      throw HttpError(400, 'Not found');
    }

    res.status(200).res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, 'missing fields');
    }
    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    if (!contact) {
      throw HttpError(404, 'Not found');
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
