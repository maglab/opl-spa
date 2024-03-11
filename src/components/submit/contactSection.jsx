import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import FormManagedTextField from "../formManagedTextField";

export default function ContactSection() {
  return (
    <Stack spacing={4}>
      <Typography variant="h5" textAlign="center">
        Contact
      </Typography>
      <Box>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={3}>
            <FormManagedTextField
              id="first-name"
              name="first_name"
              label="First name"
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <FormManagedTextField
              id="last-name"
              name="last_name"
              label="Last name"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <FormManagedTextField
              id="organisation"
              name="organisation"
              label="Organisation"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <FormManagedTextField
              id="job-field"
              name="job_field"
              label="Position"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <FormManagedTextField
              id="email"
              name="email"
              label="Email"
              type="email"
              size="small"
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
