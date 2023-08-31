import * as React from "react";
import { useState, ChangeEvent } from "react";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useRecoilState } from "recoil";

import initContact from "../entities";
import { persistContact } from "../api/contacts-apis";
import { contactsState } from "../stores";

function AddContactFormDialog() {
  const [contactToAdd, setContact] = useState(initContact());
  const [open, setOpen] = React.useState(false);
  const [contacts, setContacts] = useRecoilState(contactsState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleContactChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    let id: string = e.target.id;
    if (id === "first-name") {
      setContact((contact) => ({
        ...contact,
        firstName: e.target.value,
      }));
    } else if (id === "last-name") {
      setContact((contact) => ({
        ...contact,
        lastName: e.target.value,
      }));
    } else if (id === "email") {
      setContact((contact) => ({
        ...contact,
        email: e.target.value,
      }));
    } else if (id === "tel") {
      setContact((contact) => ({
        ...contact,
        tel: e.target.value,
      }));
    }
  }

  function handleAddContact(e: any) {
    e.preventDefault();
    persistContact(contactToAdd);
    setContacts([...contacts, contactToAdd]);
    handleClose();
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add contact
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Contact</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            To add a new contact to your rolodex, enter in their name, email,
            and telephone number.
          </DialogContentText>
          <form onSubmit={handleAddContact}>
            <Stack spacing={3}>
              <Stack
                direction="row"
                spacing={3}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <TextField
                  id="first-name"
                  type="text"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="First name"
                  size="small"
                  onChange={handleContactChange}
                />
                <TextField
                  id="last-name"
                  type="text"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="Last name"
                  size="small"
                  onChange={handleContactChange}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={3}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <TextField
                  id="email"
                  type="email"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="Email"
                  size="small"
                  onChange={handleContactChange}
                />
                <TextField
                  id="tel"
                  type="text"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="Phone number"
                  size="small"
                  onChange={handleContactChange}
                />
              </Stack>
              <Stack
                direction="row"
                sx={{ justifyContent: "flex-start" }}
                spacing={3}
              >
                <Button variant="contained" type="submit">
                  Add Contact
                </Button>
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddContactFormDialog;
