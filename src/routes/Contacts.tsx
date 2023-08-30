import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import NavBar from "../components/NavBar";
import AddContactForm from "../components/AddContactForm";

function Contacts() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters={true}>
        <Box
          sx={{
            bgcolor: "#262626",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AddContactForm></AddContactForm>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Contacts;
