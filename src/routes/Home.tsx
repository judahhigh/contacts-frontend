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
              Typescript. The backend is Rust. The database is a NoSQL solution
              by AWS called DynamoDB. The architecture exhibits a layered
              client-server paradigm. The backend api is made accessible to a
              processing layer on the frontend through REST. Data passed from
              the frontend to the backend is captured through domain models via
              a MVC-like mechanism. The controller is a set of frontend apis to
              manipulate the model domain. The data model is initialized on
              mount through a series of api calls to the backend.
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "#ffffff", fontWeight: "600" }}
            >
              What can the web-app do?
            </Typography>
            <Typography variant="h6" sx={{ color: "#ffffff" }}>
              The purpose of this app is to provide a mechanism to create a
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
              particular design choices made are consistent with what is
              extremely popular in the market right now (At least the JavaScript
              side of things as of 2023). However, this app could have also been
              designed with HTMX in mind. Why does every web-app have to be an
              SPA, or 100% an SPA for that matter. Design choices could be made
              to use Typescript or Javascript in the backend. An in-memory
              database could be used to store data in the browser through
              something like GlueSQL.
            </Typography>
            <Typography variant="h6" sx={{ color: "#ffffff" }}>
              On that note, just because React and Typescript are popular
              doesn't mean we have to use them. We could have as well written
              the frontend in Rust compiled to WASM, and then allowed for
              interoperability with JavaScript through wasm-bindgen, web-sys,
              and js-sys! Regardless, it should be obvious that the contacts
              web-app is simply a scaffold to fill in with all kinds of design
              choices. It's the chicken of web-app ideas, it takes on the flavor
              of whatever you cook it with.
            </Typography>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Home;
