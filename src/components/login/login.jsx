import { Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { RegisterForm } from "./forms";

function Login() {
  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Paper>
        <Grid container direction="column" spacing={2} padding={2}>
          <Grid item>
            <Typography variant="h5" textAlign="center">
              Register
            </Typography>
          </Grid>
          <Grid item>
            <RegisterForm />
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}

export default Login;
