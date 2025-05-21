import React, { useState } from "react";
import { CssVarsProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { instance } from "../../../Instance/Instanse";
import { useGlobalVar } from "../../../GlobalContext/Global";

const Login = (props) => {
  const {setUser} = useGlobalVar()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password : ""
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  } 

  const handleLogin = async() => {
    try {
      const response = await instance.post("/auth/login", formData)
      console.log(response)
        const token = response.data.accessToken;

      if (token) {
        localStorage.setItem("accessToken", token);
        setUser(true);
      }
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5", // optional background color
      }}
    >
      <CssVarsProvider>
        <CssBaseline />
        <Box
          sx={{
            width: 300,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "8px",
            boxShadow: 3,
            border: "1px solid gray",
            backgroundColor: "white", // optional: white box background
          }}
        >
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              <b>Welcome!</b>
            </Typography>
            <Typography variant="body2">Log in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input name="username" type="username" placeholder="username" value={formData.username} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" placeholder="password" value={formData.password} onChange={handleChange}/>
          </FormControl>
          <Button variant="contained" sx={{ mt: 1 }} onClick={handleLogin}>
            Log in
          </Button>
          <Typography
            component={NavLink}
            to="/signup"
            sx={{ fontSize: "0.875rem", alignSelf: "center" }}
          >
            Don&apos;t have an account?
          </Typography>
        </Box>
      </CssVarsProvider>
    </main>
  );
};

export default Login;
