import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import NavBar from '../components/NavBar';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box, Container, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { contactsState, tokenState, userState } from '../stores';
import { login } from '../api/contacts-apis';
import { Some } from 'ts-results';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

function ContactsLogin() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClick = () => navigate("/signup");

  const [_token, setToken] = useRecoilState(tokenState);
  const [_user, setUser] = useRecoilState(userState);
  const [_contacts, setContacts] = useRecoilState(contactsState);

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleLogin(e: any) {
    e.preventDefault();
    const result = await login(username, password);
    if (result.ok) {
      const [fetched_user, fetched_token] = result.unwrap();
      console.log(fetched_token);
      console.log(fetched_user);
      setToken(Some(fetched_token));
      setUser(Some(fetched_user));
      setContacts(fetched_user.contacts);
      navigate("/contacts");
    } else {
      handleLoginFailure();
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
              Login
            </Typography>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
              Login to begin managing your contacts.
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
                  Log in
                </Button>
                <Divider sx={{ borderBottomWidth: 2 }}>or</Divider>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ borderRadius: "50px", backgroundColor: "#b6cdf2" }}
                  onClick={handleClick}
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
        message="Failed to login, try again."
        action={failedLoginAction}
      />
    </React.Fragment>
  );
}

export default ContactsLogin;
