import * as React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#1c1c1c" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
          <Button color="primary" variant="contained">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
