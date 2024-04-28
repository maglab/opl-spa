import { Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import StandardGrid from "../common/standardGrid";
import { RegisterForm, SignInForm } from "./forms";

function Login() {
  const [registering, setRegistering] = useState(true);
  return (
    <Paper>
      <StandardGrid container direction="column" height="100%" width="100%" p>
        <Grid item>
          <Typography variant="h5" textAlign="center">
            {registering ? "Register" : "Log in"}
          </Typography>
        </Grid>
        <Grid item>
          {registering ? (
            <RegisterForm setRegistering={setRegistering} />
          ) : (
            <SignInForm setRegistering={setRegistering} />
          )}
        </Grid>
      </StandardGrid>
    </Paper>
  );
}

export default Login;
