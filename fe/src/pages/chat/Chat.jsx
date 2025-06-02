import { Grid } from "@mui/material";
import React, { useState } from "react";
import LeftSideBar from "../../components/chat/LeftSideBar";
import MessageBox from "../../components/chat/MessageBox";
import { useGlobalVar } from "../../GlobalContext/Global";
import { useEffect } from "react";

const Chat = () => {
  const { setMessages } = useGlobalVar();
  const [SelectedUser, setSelectedUser] = useState();

  useEffect(() => {
    setMessages([]);
  }, [SelectedUser]);

  return (
    <Grid container flexDirection={"row"} flex={1}>
      <Grid
        container
        flexDirection={"column"}
        size={{ xs: 0, md: 2.5 }}
        gap={2}
        p={1.5}
      >
        <LeftSideBar
          setSelectedUser={setSelectedUser}
          SelectedUser={SelectedUser}
        />
      </Grid>
      <Grid container flexDirection={"column"} flex={1} p={1.5} gap={2}>
        <MessageBox SelectedUser={SelectedUser} />
      </Grid>
    </Grid>
  );
};

export default Chat;
