import * as React from "react";
import { useState, ChangeEvent } from "react";
import { FormControl, InputLabel, Input, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Contact from "../entities/contacts";
import initContact from "../entities/contacts";
import persistContact from "../api/contacts";

function AddContactForm() {
  const [contact, setContact] = useState(initContact());

  function handleContactChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    let id: string = e.target.id;
    if (id === "first-name") {
      setContact({
        id: contact.id,
        firstName: e.target.value,
        lastName: contact.lastName,
        email: contact.email,
        tel: contact.tel,
      });
    } else if (id === "last-name") {
      setContact({
        id: contact.id,
        firstName: contact.firstName,
        lastName: e.target.value,
        email: contact.email,
        tel: contact.tel,
      });
    } else if (id === "email") {
      setContact({
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: e.target.value,
        tel: contact.tel,
      });
    } else if (id === "phone-number") {
      setContact({
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        tel: e.target.value,
      });
    }
    console.log(contact);
  }

  function handleAddContact() {
    persistContact(contact);
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <FormControl>
            <InputLabel htmlFor="first-name">First name</InputLabel>
            <Input
              id="first-name"
              type="text"
              aria-describedby="provide-a-first-name"
              onChange={handleContactChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="last-name">Last name</InputLabel>
            <Input
              id="last-name"
              type="text"
              aria-describedby="provide-a-last-name"
              onChange={handleContactChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              aria-describedby="provide-an-email"
              onChange={handleContactChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="phone-number">Phone number</InputLabel>
            <Input
              id="phone-number"
              type="tel"
              aria-describedby="provide-a-phone-number"
              onChange={handleContactChange}
            />
          </FormControl>
          <Button variant="contained" onClick={handleAddContact}>
            Add Contact
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AddContactForm;
