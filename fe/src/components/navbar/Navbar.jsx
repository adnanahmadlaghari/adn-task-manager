import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { MaterialUISwitch } from '../switch/MuiSwitch';
import { useGlobalVar } from '../../GlobalContext/Global';

export default function Navbar() {

    const Navigate = useNavigate()
    const {theme, setTheme} = useGlobalVar()

   const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" onClick={() => Navigate("/dashboard")}>Dashbord</Button>
          <Button color="inherit" onClick={() => Navigate("/profile")}>Profile</Button>
          <MaterialUISwitch onClick={() => {toggleTheme()}}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
