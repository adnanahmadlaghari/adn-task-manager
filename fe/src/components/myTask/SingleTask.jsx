import React, { useState } from "react";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { ArrowBack, Delete, ModeEdit } from "@mui/icons-material";
import { instance } from "../../Instance/Instanse";

const SingleTask = ({ task, setSelected, setTasks }) => {
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
      console.log(response);
      alert("task successfully deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Stack>
        <TextField
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <IconButton onClick={() => setSelected(null)}>
          <ArrowBack />
        </IconButton>
        <TextField
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
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
      </Stack>
    </Box>
  );
};

export default SingleTask;
