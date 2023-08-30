import * as React from "react";
import { useState, ChangeEvent } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  CardContent,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import Contact from "../entities";
import initContact from "../entities";
import persistContact from "../api/contacts-apis";

function AddContactForm() {
  const [contact, setContact] = useState(initContact());

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
    } else if (id === "phone-number") {
      setContact((contact) => ({
        ...contact,
        tel: e.target.value,
      }));
    }
  }

  function handleAddContact(e: any) {
    e.preventDefault();
    persistContact(contact);
  }

  return (
    <Box sx={{ p: 2 }}>
      <Paper
        sx={{ p: 2, borderRadius: 2, bgcolor: "#edfbfc", maxWidth: "600px" }}
        elevation={3}
      >
        <form onSubmit={handleAddContact}>
          <Stack spacing={3}>
            <h2>Add a new contact to your rolodex.</h2>
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
                variant="filled"
                label="First name"
                onChange={handleContactChange}
              />
              <TextField
                id="last-name"
                type="text"
                margin="normal"
                fullWidth
                variant="filled"
                label="Last name"
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
                variant="filled"
                label="Email"
                onChange={handleContactChange}
              />
              <TextField
                id="tel"
                type="text"
                margin="normal"
                fullWidth
                variant="filled"
                label="Phone number"
                onChange={handleContactChange}
              />
            </Stack>
            <Button variant="contained" type="submit">
              Add Contact
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default AddContactForm;
