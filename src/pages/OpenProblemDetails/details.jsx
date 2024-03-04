import { AppBar, Button, Grid, Menu, Toolbar, Typography } from "@mui/material";
import React from "react";

function TopBar() {
  return (
    <AppBar color="primary">
      <Toolbar>
        <Menu>
          <Button>Test</Button>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default function Details() {
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <TopBar />
      </Grid>
      <Grid item>
        <Typography variant="h2"> TEST</Typography>
      </Grid>
    </Grid>
  );
}
