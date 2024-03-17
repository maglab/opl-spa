import { Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Outlet } from "react-router-dom";
import { DefaultMargin } from "./defaultMargin";
import Footer from "./footer";
import Header from "./header";

export default function Layout() {
  return (
    <Grid container direction="column" sx={{ minHeight: "100vh" }}>
      <Grid item xs="auto" zIndex={1100}>
        <Header />
      </Grid>
      <Grid item xs>
        <DefaultMargin bgcolor={grey[100]}>
          <Outlet />
        </DefaultMargin>
      </Grid>
      <Grid item xs="auto">
        <Footer />
      </Grid>
    </Grid>
  );
}
