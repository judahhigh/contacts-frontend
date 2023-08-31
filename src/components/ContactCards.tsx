import { Typography } from "@mui/material";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import UpdateIcon from "@mui/icons-material/Update";
import { useRecoilState } from "recoil";

import { contactsState } from "../stores";
import { Contact } from "../entities";
import { fetchContacts } from "../api/contacts-apis";
import UpdateContactFormDialog from "./UpdateContactFormDialog";
import ContactCard from "./ContactCard";

function ContactCards() {
  const [contacts, setContacts] = useRecoilState(contactsState);

  const fetch = () => {
    const updatedContacts: Contact[] = fetchContacts();
    setContacts(updatedContacts);
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
