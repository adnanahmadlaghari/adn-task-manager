import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AlertDialogSlide from "./ProfileDialog";
import { instance } from "../../Instance/Instanse";
import { useGlobalVar } from "../../GlobalContext/Global";

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = useState([]);
  const { setUser } = useGlobalVar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await instance.get("/users/single", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await instance.delete("/users", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      localStorage.removeItem("accessToken");
      setUser(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <Box>
      <Stack alignItems={"center"}>
        <Avatar
          sx={{
            height: "200px",
            width: "200px",
          }}
          src={userData.profile}
        />
      </Stack>
      <Stack spacing={3} p={4}>
        <Typography>first name: {userData.first_name}</Typography>
        <Typography>last name: {userData.last_name}</Typography>
        <Typography>username: {userData.username}</Typography>
      </Stack>
      <Stack alignItems={"center"} spacing={3}>
        <Button variant="contained" onClick={handleClickOpen}>
          Update
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            localStorage.removeItem("accessToken");
            setUserData();
            setUser(false);
          }}
        >
          Logout
        </Button>
        <Button variant="contained" onClick={handleDeleteAccount} color="error">
          Delete Account
        </Button>
      </Stack>
      {open && (
        <AlertDialogSlide
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          user={userData}
        />
      )}
    </Box>
  );
};

export default Profile;
