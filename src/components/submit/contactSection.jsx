import { Grid } from "@mui/material";
import React from "react";
import FormManagedTextField from "../common/formManagedTextField";
import StandardGrid from "../common/standardGrid";
import StandardSection from "../common/standardSection";

export default function ContactSection() {
  return (
    <StandardSection header="Contact">
      <StandardGrid minor direction="row">
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
      </StandardGrid>
    </StandardSection>
  );
}
