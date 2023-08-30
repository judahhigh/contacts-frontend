import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import NavBar from "../components/NavBar";
import AddContactFormDialog from "../components/AddContactFormDialog";

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
          <Stack spacing={3} sx={{ p: 2, maxWidth: "600px" }}>
            <AddContactFormDialog></AddContactFormDialog>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Contacts;
