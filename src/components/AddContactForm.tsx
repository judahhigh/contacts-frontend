import * as React from "react";
import { useState, ChangeEvent } from "react";
import { FormControl, InputLabel, Input, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
          <div>
            <p>{contact.id}</p>
            <p>{contact.firstName}</p>
            <p>{contact.lastName}</p>
            <p>{contact.email}</p>
            <p>{contact.tel}</p>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AddContactForm;
