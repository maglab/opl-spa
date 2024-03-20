import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import FormManagedTextField from "../formManagedTextField";
import LoginFormManager from "./loginFormHandler";
import PasswordTextField from "./passwordTextField";
import RegisterFormManager from "./registerFormHandler";

export function EmailPasswordForm() {
  return (
    <LoginFormManager>
      <Stack spacing={2}>
        <FormManagedTextField label="Email" name="email" />
        <FormManagedTextField label="Password" name="password" />
      </Stack>
    </LoginFormManager>
  );
}

export function RegisterForm() {
  return (
    <RegisterFormManager>
      <Grid container direction="column" spacing={2} padding={2}>
        <Grid
          container
          item
          xs={12}
          spacing={2}
          display={{ xs: "column", md: "row" }}
        >
          <Grid item xs={12} md={6}>
            <FormManagedTextField
              name="first_name"
              label="First name"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormManagedTextField name="last_name" label="Last name" required />
          </Grid>
        </Grid>
        <Grid item>
          <FormManagedTextField name="email" label="Email address" required />
        </Grid>
        <Grid item>
          <PasswordTextField
            name="password"
            label="Password"
            placeholder="8 characters, 1 capital, 1 number"
          />
        </Grid>
        <Grid item>
          <PasswordTextField name="confirm_password" label="Confirm password" />
        </Grid>
        <Grid item xs={12}>
          <FormManagedTextField name="job_role" label="Job role" />
        </Grid>
        <Grid item>
          <FormManagedTextField
            name="affilation"
            label="Affilation/Institution"
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justifyContent="center"
        >
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center">
          <Typography>Already have an account?</Typography>
          <Button variant="text" size="large">
            {" "}
            Sign in.
          </Button>
        </Grid>
        <Grid item>
          <Divider>
            <Typography> Alternatively</Typography>
          </Divider>
        </Grid>
        <Grid item>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <IconButton size="large">
              <MicrosoftIcon />
            </IconButton>
            <IconButton size="large">
              <GoogleIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </RegisterFormManager>
  );
}
