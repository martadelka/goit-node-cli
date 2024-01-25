import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import path from 'path';

const contactsPath = path.resolve('db', 'contacts.json');

export async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    return contact || null;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    const newContacts = contacts.filter((item) => item.id !== contactId);

    if (contacts.length === newContacts.length) {
    return null;
    }
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    const oldContacts = contacts.filter((item) => item.id === contactId);

    return oldContacts;
}

export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name, 
        email,
        phone
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}



