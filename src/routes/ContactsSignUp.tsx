import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import NavBar from "../components/NavBar";
import React, { ChangeEvent, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box, Container, TextField } from "@mui/material";
import { register } from "../api/contacts-apis";
import { Some } from "ts-results";
import { tokenState, userState } from "../stores";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

function ContactsSignUp() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [token, setToken] = useRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleLogin(e: any) {
    e.preventDefault();
    const result = await register(username, email, password);
    if (result.ok) {
      const [fetched_user, fetched_token] = result.unwrap();
      console.log(fetched_token);
      console.log(fetched_user);
      setToken(fetched_token.token);
      setUser(Some(fetched_user));
      navigate("/contacts");
    }
  }

  const handleLoginFailure = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const failedLoginAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
                  id="email"
                  type="email"
                  margin="normal"
                  fullWidth
                  variant="standard"
                  label="Email"
                  size="small"
                  onChange={handleEmailChange}
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Failed to sign up, try again."
        action={failedLoginAction}
      />
    </React.Fragment>
  );
}

export default ContactsSignUp;
