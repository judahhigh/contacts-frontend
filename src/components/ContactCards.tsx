import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Ok, Err, Result } from "ts-results";

import { contactsState } from "../stores";
import { Contact } from "../entities";
import { fetchContacts } from "../api/contacts-apis";
import ContactCard from "./ContactCard";
import { Error } from "../api/contacts-apis";

function ContactCards() {
  const [contacts, setContacts] = useRecoilState(contactsState);

  const fetch = () => {
    const result: Result<Contact[], Error> = fetchContacts();
    if (result.ok) {
      const updatedContacts = result.unwrap();
      setContacts(updatedContacts);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (contacts && contacts.length > 0) {
    return (
      <>
        {contacts.map((contact: Contact) => (
          <ContactCard
            key={contact.id}
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
