import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ManagedTextField from "./managedTextField";

export default function ContactSection() {
  return (
    <Stack spacing={4}>
      <Typography variant="h5" textAlign="center">
        Contact Information (optional)
      </Typography>
      <Box>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <ManagedTextField
              id="first-name"
              name="first_name"
              label="First name"
            />
          </Grid>
          <Grid item xs={6}>
            <ManagedTextField
              id="last-name"
              name="last_name"
              label="Last name"
            />
          </Grid>
          <Grid item xs={12}>
            <ManagedTextField
              id="organisation"
              name="organisation"
              label="Organisation"
            />
          </Grid>
          <Grid item xs={12}>
            <ManagedTextField
              id="job-field"
              name="job_field"
              label="Position"
            />
          </Grid>
          <Grid item xs={12}>
            <ManagedTextField
              id="email"
              name="email"
              label="Email"
              type="email"
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
