import * as React from "react";
import AddContactFormDialog from "../components/AddContactFormDialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ContactCards from "../components/ContactCards";
import Container from "@mui/material/Container";
import NavBar from "../components/NavBar";
import RefreshIcon from "@mui/icons-material/Refresh";
import Stack from "@mui/material/Stack";
import { Contact } from "../entities";
import { contactsState, tokenState, userState } from "../stores";
import { Error } from "../api/contacts-apis";
import { refreshContacts } from "../api/contacts-apis";
import { Result } from "ts-results";
import { useRecoilState } from "recoil";

function Contacts() {
  const [_contacts, setContacts] = useRecoilState(contactsState);
  const [user] = useRecoilState(userState);
  const [token] = useRecoilState(tokenState);

  async function handleRefresh() {
    if (user.some && token.some && user.val.id.some && token.val.token.some) {
      const result: Result<Contact[], Error> = await refreshContacts(
        user.val.id.val,
        token.val.token.val
      );
      if (result.ok) {
        const updated_contacts: Contact[] = result.unwrap();
        setContacts(updated_contacts);
      }
    }
    // Do nothing otherwise because there's no need, we could do a toast or something.
  }

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Container maxWidth={false} disableGutters={true}>
        <Box
          sx={{
            bgcolor: "#262626",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            spacing={3}
            sx={{ p: 2, maxWidth: "600px", alignItems: "center" }}
          >
            <Stack direction="row" spacing={1}>
              <AddContactFormDialog></AddContactFormDialog>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </Stack>
            <ContactCards />
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Contacts;
