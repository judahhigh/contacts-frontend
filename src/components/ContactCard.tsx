import DeleteContactFormDialog from "./DeleteContactFormDialog";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import UpdateContactFormDialog from "./UpdateContactFormDialog";
import { Option } from "ts-results";
import { Typography } from "@mui/material";

type ContactCardProps = {
  id: Option<string>;
  firstName: Option<string>;
  lastName: Option<string>;
  email: Option<string>;
  tel: Option<string>;
};

function ContactCard({
  id,
  firstName,
  lastName,
  email,
  tel,
}: ContactCardProps) {
  return (
    <Paper elevation={24} sx={{ p: 4, bgcolor: "#fff6de" }}>
      <Typography gutterBottom variant="body1" component="div">
        <strong>Name:</strong>{" "}
        {firstName.some ? firstName.val.concat(" ") : "No name"}
        {lastName.some ? lastName.val : ""}
      </Typography>
      <Typography gutterBottom variant="body1" component="div">
        <strong>Email:</strong> {email.some ? email.val : "No email"}
      </Typography>
      <Typography gutterBottom variant="body1" component="div">
        <strong>Phone:</strong> {tel.some ? tel.val : "No phone number"}
      </Typography>
      <Stack direction="row" spacing={2}>
        <UpdateContactFormDialog
          id={id}
          firstName={firstName}
          lastName={lastName}
          email={email}
          tel={tel}
        />
        <DeleteContactFormDialog
          id={id}
          firstName={firstName}
          lastName={lastName}
          email={email}
          tel={tel}
        />
      </Stack>
    </Paper>
  );
}

export default ContactCard;
