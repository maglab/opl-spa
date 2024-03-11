import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { DefaultMargin } from "./defaultMargin";
import Footer from "./footer";
import Header from "./header";

export default function Layout() {
  return (
    <Grid container direction="column" sx={{ minHeight: "100vh" }}>
      <Grid item xs="auto">
        <Header />
      </Grid>
      <Grid item xs>
        <DefaultMargin>
          <Outlet />
        </DefaultMargin>
      </Grid>
      <Grid item xs="auto">
        <Footer />
      </Grid>
    </Grid>
  );
}
