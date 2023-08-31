import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

import UpdateContactFormDialog from "./UpdateContactFormDialog";
import DeleteContactFormDialog from "./DeleteContactFormDialog";

type ContactCardProps = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  tel?: string;
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
        <strong>Name:</strong> {firstName ? firstName.concat(" ") : "No name"}
        {lastName ? lastName : ""}
      </Typography>
      <Typography gutterBottom variant="body1" component="div">
        <strong>Email:</strong> {email ? email : "No email"}
      </Typography>
      <Typography gutterBottom variant="body1" component="div">
        <strong>Phone:</strong> {tel ? tel : "No phone number"}
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
