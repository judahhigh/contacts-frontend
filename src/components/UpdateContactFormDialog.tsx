import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import UpdateIcon from '@mui/icons-material/Update';
import { ChangeEvent, useState } from 'react';
import { Option, Some } from 'ts-results';
import { TextField } from '@mui/material';
import { tokenState, userState } from '../stores';
import { updateContact } from '../api/contacts-apis';
import { useRecoilState, useResetRecoilState } from 'recoil';

type UpdateContactProps = {
  id: Option<string>;
  firstName: Option<string>;
  lastName: Option<string>;
  email: Option<string>;
  tel: Option<string>;
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
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);

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

  async function handleUpdateContact(e: any) {
    e.preventDefault();
    if (user.some && token.some) {
      const res = await updateContact(user.val, contact, token.val);
      // Do a toast that the contact was updated successfully
    }
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
