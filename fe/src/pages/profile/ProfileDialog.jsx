import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Avatar, Box, Stack, TextField } from "@mui/material";
import { instance } from "../../Instance/Instanse";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  handleClickOpen,
  handleClose,
  open,
  user,
}) {
  const [formData, setFormData] = React.useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    username: user.username || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdateuser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await instance.patch("/users", formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      handleClose()
      alert("user successfully update")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Setup Profile conf"}</DialogTitle>
        <DialogContent>
          <Box>
            <Stack alignItems={"center"}>
              <Avatar
                sx={{
                  height: "200px",
                  width: "200px",
                }}
              />
            </Stack>
            <Stack spacing={3} p={4}>
              <TextField
                name="first_name"
                type="name"
                label="first name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <TextField
                name="last_name"
                type="name"
                label="last name"
                value={formData.last_name}
                onChange={handleChange}
              />
              <TextField
                name="username"
                label="username"
                type="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cencel</Button>
          <Button onClick={handleUpdateuser}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
