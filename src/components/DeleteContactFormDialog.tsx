import * as React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState } from "recoil";

import { deleteContact } from "../api/contacts-apis";
import { contactsState } from "../stores";

type DeleteContactProps = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  tel?: string;
};

function DeleteContactFormDialog({
  id,
  firstName,
  lastName,
  email,
  tel,
}: DeleteContactProps) {
  const [contactToDelete] = useState({
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    tel: tel,
  });
  const [contacts, setContacts] = useRecoilState(contactsState);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleDeleteContact(e: any) {
    e.preventDefault();
    deleteContact(contactToDelete);
    setContacts((contacts) =>
      contacts.filter((contact) => contact.id !== contactToDelete.id)
    );
    handleClose();
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
        color="error"
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete a Contact</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Are you sure you want to delete the following contact?
          </DialogContentText>
          <form onSubmit={handleDeleteContact}>
            <Stack spacing={3}>
              <Stack
                direction="row"
                spacing={3}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <TextField
                  disabled
                  id="first-name"
                  type="text"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="First name"
                  size="small"
                  value={firstName ? firstName : ""}
                />
                <TextField
                  disabled
                  id="last-name"
                  type="text"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="Last name"
                  size="small"
                  value={lastName ? lastName : ""}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={3}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <TextField
                  disabled
                  id="email"
                  type="email"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="Email"
                  size="small"
                  value={email ? email : ""}
                />
                <TextField
                  disabled
                  id="tel"
                  type="text"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="Phone number"
                  size="small"
                  value={tel ? tel : ""}
                />
              </Stack>
              <Stack
                direction="row"
                sx={{ justifyContent: "flex-start" }}
                spacing={3}
              >
                <Button variant="contained" type="submit">
                  Yes
                </Button>
                <Button variant="contained" onClick={handleClose}>
                  No
                </Button>
              </Stack>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteContactFormDialog;
