import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, Delete, ModeEdit } from "@mui/icons-material";
import { instance } from "../../Instance/Instanse";

const SingleTask = ({ task, setSelected, setTasks, newData, setnewData }) => {
  const [formData, setFormData] = useState({
    title: task.title || "",
    content: task.content || "",
  });

  if (!task) return null;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditTask = async (id) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await instance.patch(`/tasks/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setSelected(null);
      setnewData(!newData);
      alert("task successfully update");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await instance.delete(`/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTask) => prevTask.filter((t) => t._id !== id));
      setSelected(null);
      setnewData(!newData);
      console.log(response);
      alert("task successfully deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      width={"100%"}
      height={`calc(100vh - 220px)`}
      flexDirection={"row"}
      justifyContent={"center"}
    >
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "450px",
          alignItems: "center",
          height: "fit-content",
          gap: 2,
          p: 2,
        }}
      >
        <Grid
          container
          flexDirection={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <IconButton onClick={() => setSelected(null)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" flex={1} textAlign={"center"}>
            Detail Task
          </Typography>
        </Grid>
        <TextField
          label="title"
          name="title"
          variant="standard"
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          label="content"
          name="content"
          variant="standard"
          fullWidth
          value={formData.content}
          onChange={handleChange}
        />
        <Grid container flexDirection={"row"} gap={2}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => handleDeleteTask(task._id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            endIcon={<ModeEdit />}
            onClick={() => handleEditTask(task._id)}
          >
            Edit
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SingleTask;
