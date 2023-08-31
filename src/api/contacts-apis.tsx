import { Contact } from "../entities";

export function persistContact(contact: Contact): boolean {
  // TODO: Implement processing and persistence of contact through api call to backend
  // The backend will
  // 1. check if the contact already exists based on supplied information
  // 2. if the contact is unique, it will attempt to persist it, otherwise it will fail
  console.log(contact);
  return false;
}

export function fetchContacts(): Contact[] {
  let contacts: Contact[] = [
    {
      id: "123",
      firstName: "joe",
      lastName: "bob",
      email: "fake@fake.com",
      tel: "1231231234",
    },
    {
      id: "234",
      firstName: "jim",
      lastName: "bob",
      email: "fake2@fake2.com",
      tel: "123498771234",
    },
    {
      id: "654",
      firstName: "kim",
      lastName: "bob",
      email: "fake3@fake2.com",
      tel: "33333333",
    },
  ];
  return contacts;
}

export function updateContact(contact: Contact): Contact {
  return contact;
}
