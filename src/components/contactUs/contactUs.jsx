import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Form } from "formik";
import React from "react";
import contactUsText from "../../assets/contactUs.json";
import FormManagedTextField from "../formManagedTextField";
import FormManager from "./formManager";

export default function ContactUs() {
  return (
    <FormManager>
      <Form>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h5" textAlign="center">
              Contact Us
            </Typography>
            <Typography whiteSpace="pre-wrap">
              {contactUsText.paragraph}
            </Typography>
          </Stack>
          <Paper elevation={1}>
            <Stack spacing={4} p={2}>
              <Stack spacing={4} textAlign="center">
                <Typography variant="h5">Contact</Typography>
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
              <Stack spacing={4}>
                <Typography variant="h5">Message</Typography>
                <Stack spacing={2}>
                  <FormManagedTextField
                    name="subject"
                    label="Subject"
                    size="small"
                    required
                    select
                  >
                    {["Suggestion", "Bug Report", "Comment", "Other"].map(
                      (option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      )
                    )}
                  </FormManagedTextField>
                  <FormManagedTextField
                    name="message"
                    label="Message"
                    required
                    multiline
                    rows={6}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Paper>
          <Stack alignItems="center">
            <Button type="submit" variant="contained" size="large">
              Send Message
            </Button>
          </Stack>
        </Stack>
      </Form>
    </FormManager>
  );
}
