const express = require('express');
const { validateBody, isValidId, auth } = require('../../middlewares');
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
  .get(auth, getContacts)
  .post(auth, validateBody(schemas.addSchemaContact), addContact);

router
  .route('/:contactId')
  .get(auth, isValidId, getContactById)
  .delete(auth, isValidId, removeContact)
  .put(auth, isValidId, validateBody(schemas.addSchemaContact), updateContact);

router.patch('/:contactId/favorite', auth, isValidId, updateStatusContact);

module.exports = router;
