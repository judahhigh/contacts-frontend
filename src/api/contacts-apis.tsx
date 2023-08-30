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
  ];
  return contacts;
}
