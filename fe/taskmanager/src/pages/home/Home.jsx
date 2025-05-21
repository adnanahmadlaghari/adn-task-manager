import { Box, Button, Stack } from "@mui/material";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { useGlobalVar } from "../../GlobalContext/Global";
import { useEffect } from "react";

const Home = () => {
  const { user } = useGlobalVar();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Button variant="contained" component={NavLink} to="/dashboard">
          Dashboard
        </Button>
        <Button variant="contained" component={NavLink} to="/profile">
          Profile
        </Button>
      </Stack>
    </Box>
  );
};

export default Home;
