import { Container, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Outlet } from "react-router";
import StandardGrid from "../common/standardGrid";
import Footer from "../footer";
import Header from "../header";

function LoginLayout() {
  return (
    <StandardGrid container direction="column">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid
        item
        container
        xs={12}
        bgcolor={grey[100]}
        minHeight="100vh"
        alignItems="center"
      >
        <Container maxWidth="sm">
          <Outlet />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </StandardGrid>
  );
}

export default LoginLayout;
