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
import UpdateIcon from "@mui/icons-material/Update";

import { updateContact } from "../api/contacts-apis";

type UpdateContactProps = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  tel?: string;
};

function UpdateContactFormDialog({
  id,
  firstName,
  lastName,
  email,
  tel,
}: UpdateContactProps) {
  const [contact, setContact] = useState({
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    tel: tel,
  });
  const [open, setOpen] = React.useState(false);

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

  function handleUpdateContact(e: any) {
    e.preventDefault();
    updateContact(contact);
    handleClose();
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<UpdateIcon />}
      >
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update an existing Contact</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            To update this contact in your rolodex, update any of the fields
            shown.
          </DialogContentText>
          <form onSubmit={handleUpdateContact}>
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
                  value={firstName ? firstName : ""}
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
                  value={lastName ? lastName : ""}
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
                  value={email ? email : ""}
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
                  value={tel ? tel : ""}
                  onChange={handleContactChange}
                />
              </Stack>
              <Stack
                direction="row"
                sx={{ justifyContent: "flex-start" }}
                spacing={3}
              >
                <Button variant="contained" type="submit">
                  Update Contact
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

export default UpdateContactFormDialog;
