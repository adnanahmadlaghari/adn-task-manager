import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Grid } from "@mui/material";

const Layout = () => {
  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"start"}
      minHeight={"100vh"}
    >
      <Navbar />
      <Outlet />
    </Grid>
  );
};

export default Layout;
