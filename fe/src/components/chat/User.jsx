import { Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import { useGlobalVar } from "../../GlobalContext/Global";

const User = ({ id, fn, ln, username, setSelectedUser, SelectedUser }) => {
  const theme = useTheme();
  const cxt = useGlobalVar();

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        bgcolor: SelectedUser === id ? theme.palette.primary.main : "",
        color: SelectedUser === id ? theme.palette.primary.contrastText : "",
        cursor: "pointer",
      }}
      onClick={() => setSelectedUser(id)}
    >
      <Typography variant="h6">
        {fn} {ln}
      </Typography>
      <Typography variant="body1" pl={1}>
        {username}
      </Typography>
      {cxt.OnlineUsers.includes(id) && (
        <Typography variant="body1" pl={1}>
          online
        </Typography>
      )}
    </Paper>
  );
};

export default User;
