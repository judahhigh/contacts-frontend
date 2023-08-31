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
          <Paper
            elevation={24}
            key={contact.id}
            sx={{ p: 4, bgcolor: "#fff6de" }}
          >
            <Typography gutterBottom variant="body1" component="div">
              <strong>Name:</strong>{" "}
              {contact.firstName ? contact.firstName.concat(" ") : "No name"}
              {contact.lastName ? contact.lastName : ""}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              <strong>Email:</strong>{" "}
              {contact.email ? contact.email : "No email"}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              <strong>Phone:</strong>{" "}
              {contact.tel ? contact.tel : "No phone number"}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<UpdateIcon />}
                size="small"
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                size="small"
              >
                Delete
              </Button>
            </Stack>
          </Paper>
        ))}
      </>
    );
  } else {
    return <></>;
  }
}

export default ContactCards;
