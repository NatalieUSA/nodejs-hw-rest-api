const express = require('express');
const { validateBody, isValidId, autenticate } = require('../../middlewares');
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
  .get(autenticate, getContacts)
  .post(autenticate, validateBody(schemas.addSchemaContact), addContact);

router
  .route('/:contactId')
  .get(autenticate, isValidId, getContactById)
  .delete(autenticate, isValidId, removeContact)
  .put(
    autenticate,
    isValidId,
    validateBody(schemas.addSchemaContact),
    updateContact
  );

router.patch(
  '/:contactId/favorite',
  autenticate,
  isValidId,
  updateStatusContact
);

module.exports = router;
