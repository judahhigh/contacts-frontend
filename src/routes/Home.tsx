import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import NavBar from "../components/NavBar";
import logo from "../logo.png";

function Home() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <CssBaseline />
      <Container maxWidth={false} disableGutters={true}>
        <Box
          sx={{
            bgcolor: "#262626",
            height: "100vh",
            width: "100%",
          }}
        >
          <Stack
            spacing={3}
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              p: 4,
              overflowY: "auto",
            }}
          >
            <img
              src={logo}
              style={{ maxWidth: "300px" }}
              className="App-logo"
              alt="logo"
            />
            <Typography
              variant="h1"
              sx={{ color: "#ffffff", fontWeight: "700" }}
            >
              CONTACTS
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "#ffffff", fontWeight: "600" }}
            >
              Introduction
            </Typography>
            <Typography variant="h6" sx={{ color: "#ffffff" }}>
              Contacts is a full stack web-app demo of a simple rolodex using
              Typescript, React, and Rust. The frontend is entirely React and
              Typescript. The backend is Rust. The database is currently SQLite
              powered by Prisma, but eventually it will be an AWS DynamoDB NoSQL
              database. The architecture exhibits a layered client-server
              paradigm. The backend api is made accessible to a processing layer
              on the frontend through REST. Data passed from the frontend to the
              backend is captured through domain models via a MVC-like
              mechanism. The controller is a set of frontend apis to manipulate
              the model domain. The data model is initialized on mount through a
              series of api calls to the backend.
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "#ffffff", fontWeight: "600" }}
            >
              What can the web-app do?
            </Typography>
            <Typography variant="h6" sx={{ color: "#ffffff" }}>
              The purpose of this app is to provide a platform to create a
              rolodex, or a set of contacts. The user can view their current
              contacts, create new contacts, delete existing contacts, or update
              them. That's it. It's basically a CRUD app, plain and simple.
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "#ffffff", fontWeight: "600" }}
            >
              Why create a rolodex app?
            </Typography>
            <Typography variant="h6" sx={{ color: "#ffffff" }}>
              Contacts is a simple enough idea for demonstrating
              frontend/backend dynamics and software architecture. This
              particular web-app could be built in a million different ways. The
              particular design choices made are consistent with my own
              interests. However, this app could have also avoided JavaScript
              altogether using something like HTMX. There is also a growing
              number of technologies to setup a backend with JavaScript or
              TypeScript, but I'm partial to statically-typed languages like
              Rust for the backend. An in-memory database could have also been
              used to store data in the browser with something like GlueSQL.
            </Typography>
            <Typography variant="h6" sx={{ color: "#ffffff" }}>
              Just because React and Typescript are popular doesn't mean I have
              to use them. I could have as well written the frontend in Rust
              compiled to WASM, and then allowed for interoperability with
              JavaScript through wasm-bindgen, web-sys, and js-sys! This is I
              have experience with and plan to do on a personal project in the
              future. Regardless, the contacts web-app is simply a scaffold to
              fill in with all kinds of design choices and preferences. It's the
              chicken of web-app ideas, it takes on the flavor of whatever you
              cook it with.
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "#ffffff", fontWeight: "600" }}
            >
              How to use the app?
            </Typography>
            <Typography variant="h6" sx={{ color: "#ffffff" }}>
              After standing up the backend and frontend client, register or
              login, and begin creating contacts! Close and re-open the browser,
              logout and login again!
            </Typography>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Home;
