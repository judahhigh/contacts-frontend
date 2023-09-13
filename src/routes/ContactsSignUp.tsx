import React from "react";
import NavBar from "../components/NavBar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Box, Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, ChangeEvent } from "react";
import Typography from "@mui/material/Typography";

function ContactsSignUp() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleLogin(e: any) {
    e.preventDefault();
  }


  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: "#f7c3c3",
            borderRadius: "25px",
            p: 4,
            mt: 4,
            boxShadow: "0px 0px 30px gray",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack spacing={3} sx={{ flexGrow: 1 }}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "600" }}
            >
              Sign Up
            </Typography>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
              Sign up to begin managing your contacts.
            </Typography>
            <form onSubmit={handleLogin}>
              <Stack spacing={3}>
                <TextField
                  id="username"
                  type="text"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="Username"
                  size="small"
                  onChange={handleUsernameChange}
                />
                <TextField
                  id="username"
                  type="email"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="Email"
                  size="small"
                  onChange={handleUsernameChange}
                />
                <TextField
                  id="password"
                  type="password"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="Password"
                  size="small"
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ borderRadius: "50px" }}
                >
                  Sign up
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default ContactsSignUp;
