import { Grid } from "@mui/material";
import React, { useState } from "react";
import LeftSideBar from "../../components/chat/LeftSideBar";
import MessageBox from "../../components/chat/MessageBox";

const Chat = () => {
  const [SelectedUser, setSelectedUser] = useState();
  return (
    <Grid container flexDirection={"row"} flex={1}>
      <Grid container flexDirection={"column"} size={{ xs: 0, md: 2.5 }}>
        <LeftSideBar
          setSelectedUser={setSelectedUser}
          SelectedUser={SelectedUser}
        />
      </Grid>
      <Grid
        container
        flexDirection={"column"}
        flex={1}
        border={"1px solid red"}
      >
        <MessageBox />
      </Grid>
    </Grid>
  );
};

export default Chat;
