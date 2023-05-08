const fs = require('fs/promises');
const crypto = require('crypto');

const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  return contact || null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contactId;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };

  const updatedContacts = [newContact, ...contacts];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
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
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
