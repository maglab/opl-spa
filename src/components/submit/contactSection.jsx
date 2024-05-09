import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import FormManagedCheckbox from "../common/formManagedCheckbox";
import FormManagedTextField from "../common/formManagedTextField";
import StandardGrid from "../common/standardGrid";
import StandardSection from "../common/standardSection";

export default function ContactSection() {
  // Pass up the helper functions from the child form managed checkbox for flexible setting of the value.
  const checkBoxHandler = (e, helpers) => {
    const { checked } = e.target;
    helpers.setValue(checked);
  };
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
        <Grid item>
          <FormManagedCheckbox
            name="contact_user"
            checkboxValue
            label="I agree to be emailed when this open problem is confirmed and published"
            onChange={checkBoxHandler}
          />
        </Grid>
        <Grid item>
          <Typography>
            By submitting any amount of your contact details you have read and
            agree with our privacy policy.
          </Typography>
        </Grid>
        <Grid item>
          <Typography fontWeight="bold">
            Read our
            <Link
              component={RouterLink}
              to="../privacy-policy"
              underline="hover"
              color="primary.main"
            >
              privacy policy
            </Link>
            for information on how we handle this data.
          </Typography>
        </Grid>
      </StandardGrid>
    </StandardSection>
  );
}
