import ContactCard from './ContactCard';
import uuid from 'react-uuid';
import { Contact } from '../entities';
import { contactsState } from '../stores';
import { Err, Ok, Result } from 'ts-results';
import { Error } from '../api/contacts-apis';
import { fetchContacts } from '../api/contacts-apis';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';


function ContactCards() {
  const [contacts, setContacts] = useRecoilState(contactsState);

  // const fetch = () => {
  //   const result: Result<Contact[], Error> = fetchContacts();
  //   if (result.ok) {
  //     const updatedContacts = result.unwrap();
  //     setContacts(updatedContacts);
  //   }
  // };

  // useEffect(() => {
  //   fetch();
  // }, []);
  console.log("CONTACT CARD PAGE:", contacts);
  console.log("TYPE INFO ON CONTACTS")
  contacts.forEach((val) => {
    console.log(typeof val);
    console.log(val);
    console.log(typeof val.firstName)
    console.log(val.firstName)
  });

  if (contacts && contacts.length > 0) {
    return (
      <>
        {contacts.map((contact: Contact) => (
          <ContactCard
            key={uuid()}
            id={contact.id}
            firstName={contact.firstName}
            lastName={contact.lastName}
            email={contact.email}
            tel={contact.tel}
          />
        ))}
      </>
    );
  } else {
    return <></>;
  }
}

export default ContactCards;
