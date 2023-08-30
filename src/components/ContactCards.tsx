import { Card } from "@mui/material";
import CardContent from "@mui/material";
import { Typography } from "@mui/material";
import { ButtonBase, CardActionArea, CardActions } from "@mui/material";
import { Contact } from "../entities";
import { fetchContacts } from "../api/contacts-apis";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import UpdateIcon from "@mui/icons-material/Update";
import { useStore } from "../stores";

function ContactCards() {
  const [store, setStore] = useStore();

  const fetch = () => {
    const updatedContacts: Contact[] = fetchContacts();
    console.log(updatedContacts);
    if (store) {
      setStore((s) => ({
        ...s,
        contacts: updatedContacts,
      }));
    }

    // setContacts();
  };

  useEffect(() => {
    fetch();
  }, []);

  if (store && store.contacts && store.contacts.length > 0) {
    return (
      <>
        {store.contacts.map((contact: Contact) => (
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
