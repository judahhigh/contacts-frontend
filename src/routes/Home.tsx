import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import NavBar from "../components/NavBar";

function Home() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters={true}>
        <Box sx={{ bgcolor: "#262626", height: "100vh" }} />
      </Container>
    </React.Fragment>
  );
}

export default Home;
