import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import initContact from "../entities";
import Stack from "@mui/material/Stack";
import uuid from "react-uuid";
import { ChangeEvent, useState } from "react";
import { Contact } from "../entities";
import { contactsState, tokenState, userState } from "../stores";
import { createContact, refreshContacts } from "../api/contacts-apis";
import { Some } from "ts-results";
import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";

function AddContactFormDialog() {
  const [contactToAdd, setContact] = useState(initContact());
  const [open, setOpen] = React.useState(false);
  const [_contacts, setContacts] = useRecoilState(contactsState);
  const [user] = useRecoilState(userState);
  const [token] = useRecoilState(tokenState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleContactChange(e: ChangeEvent<HTMLInputElement>) {
    let id: string = e.target.id;
    if (contactToAdd.id.none) {
      const contact_id: string = uuid();
      setContact((contact) => ({
        ...contact,
        id: Some(contact_id),
      }));
    }
    if (id === "first-name") {
      setContact((contact) => ({
        ...contact,
        firstName: Some(e.target.value),
      }));
    } else if (id === "last-name") {
      setContact((contact) => ({
        ...contact,
        lastName: Some(e.target.value),
      }));
    } else if (id === "email") {
      setContact((contact) => ({
        ...contact,
        email: Some(e.target.value),
      }));
    } else if (id === "tel") {
      setContact((contact) => ({
        ...contact,
        tel: Some(e.target.value),
      }));
    }
  }

  async function handleAddContact(e: any) {
    e.preventDefault();
    if (user.some && user.val.id.some && token.some && token.val.token.some) {
      const res = await createContact(contactToAdd, user.val, token.val);
      if (res.ok) {
        const res = await refreshContacts(user.val.id.val, token.val.token.val);
        if (res.ok) {
          const new_contacts: Contact[] = res.unwrap();
          setContacts(new_contacts);
        }
      }
      // Do a toast that the contact was updated successfully
    }
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
