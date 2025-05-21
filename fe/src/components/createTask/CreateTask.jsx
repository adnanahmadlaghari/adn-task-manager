import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { instance } from "../../Instance/Instanse";

const CreateTask = ({ onSubmit, newData, setnewData, setValue }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreateTask = async () => {
    if (!formData.title || !formData.content) {
      return alert("All fields are required");
    }

    try {
      const token = localStorage.getItem("accessToken");

      const response = await instance.post("/tasks/", formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("task successfully created");
      setnewData(!newData);
      setValue(1);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        margin: "auto",
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
      component={Paper}
    >
      <Typography variant="h5" gutterBottom>
        Create a Task
      </Typography>
      <form>
        <Stack>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Stack>
        <Stack>
          <TextField
            fullWidth
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={20}
            required
          />
        </Stack>
      </form>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleCreateTask}
      >
        Create Task
      </Button>
    </Box>
  );
};

export default CreateTask;
