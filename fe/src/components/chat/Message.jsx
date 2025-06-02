import { Paper, Typography } from "@mui/material";
import React from "react";

const Message = ({ msg }) => {
  const { from, text } = msg;
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Typography variant="h6">{from}</Typography>
      <Typography variant="body1">{text}</Typography>
    </Paper>
  );
};

export default Message;
