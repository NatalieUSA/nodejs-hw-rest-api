const express = require('express');
const { isValidId } = require('../../middlewares');

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contactsControllers');

const router = express.Router();

router.route('/').get(getContacts).post(addContact);

router
  .route('/:contactId')
  .get(isValidId, getContactById)
  .delete(isValidId, removeContact)
  .put(isValidId, updateContact);

router.patch('/:contactId/favorite', isValidId, updateStatusContact);

module.exports = router;
