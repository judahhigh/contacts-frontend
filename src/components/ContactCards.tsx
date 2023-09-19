import ContactCard from "./ContactCard";
import Stack from "@mui/material/Stack";
import uuid from "react-uuid";
import { Box } from "@mui/material";
import { Contact } from "../entities";
import { contactsState } from "../stores";
import { useRecoilState } from "recoil";

function ContactCards() {
  const [contacts] = useRecoilState(contactsState);

  if (contacts && contacts.length > 0) {
    return (
      <Box sx={{ maxHeight: "100%", overflow: "auto" }}>
        <Stack
          spacing={3}
          sx={{ pb: 2, px: 2, maxWidth: "600px", alignItems: "center" }}
        >
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
        </Stack>
      </Box>
    );
  } else {
    return <></>;
  }
}

export default ContactCards;
