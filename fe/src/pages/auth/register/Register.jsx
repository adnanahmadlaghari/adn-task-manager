import React, { useState } from "react";
import { CssVarsProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { instance } from "../../../Instance/Instanse";
import { useGlobalVar } from "../../../GlobalContext/Global";

const Register = () => {
  const { setUser } = useGlobalVar();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      return alert("password must be same");
    }

    try {
      const response = await instance.post("/auth/register", formData);
      console.log(response);
      const token = response.data.accessToken;

      if (token) {
        localStorage.setItem("accessToken", token);
        setUser(true);
      }
      navigate("/")
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CssVarsProvider>
        <CssBaseline />
        <Box
          sx={{
            width: 320,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "12px",
            boxShadow: 3,
            border: "1px solid gray",
            backgroundColor: "white",
          }}
        >
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              <b>Welcome!</b>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign up to continue.
            </Typography>
          </div>
          <FormControl>
            <Input
              name="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <Input
              name="last_name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <Input
              name="username"
              type="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormControl>
           <FormControl>
            <Input
              name="role"
              type="role"
              placeholder="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button variant="contained" sx={{ mt: 1 }} onClick={handleRegister}>
            Sign Up
          </Button>
          <Typography
            component={NavLink}
            to="/login"
            sx={{ fontSize: "0.875rem", alignSelf: "center" }}
          >
            Already have an account?
          </Typography>
        </Box>
      </CssVarsProvider>
    </Box>
  );
};

export default Register;
