import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import logo from "../logo.png";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { tokenState, userState } from "../stores";
import { useRecoilState } from "recoil";
import { None } from "ts-results";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [token, setToken] = useRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  function handleLogout(): void {
    setToken(None);
    setUser(None);
    navigate("/")
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <AppBar position="static" sx={{ bgcolor: "#1c1c1c" }}>
        <Toolbar>
          <Box sx={{ mr: 1, mt: 0.5 }}>
            <img
              src={logo}
              style={{ maxWidth: "20px" }}
              className="App-logo"
              alt="logo"
            />
          </Box>
          <Typography variant="h6" component="div" sx={{ mr: 2, flexGrow: 1 }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#ffffff",
                textTransform: "uppercase",
              }}
            >
              Home
            </Link>
          </Typography>
          {token.some && (
            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
              <Link
                to="/contacts"
                style={{
                  textDecoration: "none",
                  color: "#ffffff",
                  textTransform: "uppercase",
                }}
              >
                Contacts
              </Link>
            </Typography>
          )}
          {token.none ? (
            <Button color="primary" variant="contained">
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#ffffff",
                  textTransform: "uppercase",
                }}
              >
                Login
              </Link>
            </Button>
          ) : (
            <Button color="primary" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
