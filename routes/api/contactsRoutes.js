const express = require('express');
const { validateBody, isValidId } = require('../../middlewares');
const schemas = require('../../schemas');
const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contacts');

const router = express.Router();

router
  .route('/')
  .get(getContacts)
  .post(validateBody(schemas.addSchemaContact), addContact);

router
  .route('/:contactId')
  .get(isValidId, getContactById)
  .delete(isValidId, removeContact)
  .put(validateBody(schemas.addSchemaContact), isValidId, updateContact);

router.patch('/:contactId/favorite', isValidId, updateStatusContact);

module.exports = router;
