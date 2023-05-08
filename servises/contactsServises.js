const fs = require('fs/promises');
const crypto = require('crypto');

const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContactsService = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactByIdService = async contactId => {
  const contacts = await listContactsService();
  const contact = contacts.find(contact => contact.id === contactId);
  return contact || null;
};

const removeContactService = async contactId => {
  const contacts = await listContactsService();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contactId;
};

const addContactService = async body => {
  const contacts = await listContactsService();
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };

  const updatedContacts = [newContact, ...contacts];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return newContact;
};

const updateContactService = async (contactId, body) => {
  const contacts = await listContactsService();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = {
    id: contactId,
    ...body,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
