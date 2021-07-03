import * as fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, '/db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  const contact = data.find(item => item.id === Number(contactId));

  return contact;
}

async function removeContact(contactId) {
  const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  const contacts = data.filter(item => item.id !== Number(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}

async function addContact(name, email, phone) {
  const data = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
  const dtoIn = { id: data[data.length - 1].id + 1, name, email, phone };

  const newContacts = [...data, dtoIn];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContacts;
}
export default { listContacts, getContactById, removeContact, addContact };
