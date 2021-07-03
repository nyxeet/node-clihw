import contacts from './contacts.js';
import { Command } from 'commander';

const program = new Command();

program
  .option('-a, --actionS <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --nameS <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ actionS, id, nameS, email, phone }) {
  switch (actionS) {
    case 'list':
      console.log(await contacts.listContacts());
      break;

    case 'get':
      console.log(await contacts.getContactById(id));
      break;

    case 'add':
      console.log(await contacts.addContact(nameS, email, phone));
      break;

    case 'remove':
      console.log(await contacts.removeContact(id));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
