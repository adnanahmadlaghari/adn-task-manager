import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
  const nav = useNavigate();
  return (
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
        <Grid container flexDirection={"row"} alignItems={"center"}>
          <Button color="inherit" onClick={() => nav("/")}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => nav("/profile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => nav("/chat")}>
            Chat
          </Button>
          <ToggleTheme />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
