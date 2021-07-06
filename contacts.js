const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '/db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf8');
  console.table(JSON.parse(data));
}

async function getContactById(contactId) {
  const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  const contact = data.find(item => item.id === Number(contactId));

  console.table(contact);
}

async function removeContact(contactId) {
  const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  const contacts = data.filter(item => item.id !== Number(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.table(contacts);
}

async function addContact(name, email, phone) {
  const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  const dtoIn = { id: data[data.length - 1].id + 1, name, email, phone };

  const newContacts = [...data, dtoIn];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  console.table(newContacts);
}
module.exports = { listContacts, getContactById, removeContact, addContact };
