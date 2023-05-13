const { controllerWrapper } = require('../../helpers');

const getContacts = require('./getContacts');
const addContact = require('./addContact');
const getContactById = require('./getContactById');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getContactById: controllerWrapper(getContactById),
  removeContact: controllerWrapper(removeContact),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
