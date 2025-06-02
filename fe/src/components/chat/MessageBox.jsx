import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useGlobalVar } from "../../GlobalContext/Global";
import Message from "./Message";
import { useState } from "react";

const MessageBox = ({ SelectedUser }) => {
  const { Messages, sendMessage } = useGlobalVar();
  const theme = useTheme();
  const [MessageData, setMessageData] = useState("");
  const handleSend = () => {
    sendMessage(SelectedUser, MessageData);
    setMessageData("");
  };
  return (
    <>
      <Grid container flexDirection={"column"} gap={1} flex={1}>
        {!SelectedUser && (
          <Typography variant="h6">
            Please Select User on left side bar to chat with
          </Typography>
        )}
        {Messages.length <= 0 && SelectedUser ? (
          <Typography variant="h6">No Messages</Typography>
        ) : (
          <>
            {Messages.map((msg, idx) => (
              <Message key={idx} msg={msg} />
            ))}
          </>
        )}
      </Grid>
      {SelectedUser && (
        <TextField
          variant="outlined"
          multiline
          maxRows={4}
          value={MessageData}
          onChange={(e) => setMessageData(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{
                      color: theme.palette.mode === "dark" ? "white" : "black",
                    }}
                    onClick={handleSend}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          fullWidth
          placeholder="Please enter the msg"
        />
      )}
    </>
  );
};

export default MessageBox;
