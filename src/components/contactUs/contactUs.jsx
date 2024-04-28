import { Button, Grid, MenuItem, Paper, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Form } from "formik";
import React, { useState } from "react";

import { reportContactUs } from "../../apiNew/apiReport";
import contactUsText from "../../assets/contactUs.json";
import { generalReport } from "../../constants/reportMappings";
import useExtendedTheme from "../../theme/useExtendedTheme";
import Center from "../common/center";
import Dialog from "../common/dialog";
import FormManagedTextField from "../common/formManagedTextField";
import HeaderContent from "../common/headerContent";
import StandardGrid from "../common/standardGrid";
import StandardStack from "../common/standardStack";
import FormManager from "./formManager";

export default function ContactUs() {
  const theme = useExtendedTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState({ title: "", message: "" });
  const { mutate } = useMutation({
    mutationFn: (postData) => reportContactUs(postData),
    onSuccess: () => {
      setDialogOpen(true);
      setDialogText({
        title: contactUsText.dialog.success.title,
        message: contactUsText.dialog.success.message,
      });
    },
    onError: () => {
      setDialogOpen(true);
      setDialogText({
        title: contactUsText.dialog.error.title,
        message: contactUsText.dialog.error.message,
      });
    },
  });
  const submitHandler = (values) => {
    mutate(values);
  };

  return (
    <FormManager onSubmitHandler={submitHandler}>
      <Form>
        <HeaderContent header="Contact Us">
          <Typography whiteSpace="pre-wrap">
            {contactUsText.paragraph}
          </Typography>
          <Paper elevation={1}>
            <StandardStack main p={theme.layout.padding}>
              <HeaderContent header="Contact">
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
              </HeaderContent>
              <HeaderContent header="Message">
                <StandardStack minor>
                  <FormManagedTextField
                    name="subject"
                    label="Subject"
                    size="small"
                    required
                    select
                  >
                    {Object.entries(generalReport).map(
                      ([textValue, integerValue]) => (
                        <MenuItem key={integerValue} value={integerValue}>
                          {textValue}
                        </MenuItem>
                      )
                    )}
                  </FormManagedTextField>
                  <FormManagedTextField
                    name="message"
                    label="Message"
                    required
                    multiline
                    minRows={6}
                  />
                </StandardStack>
              </HeaderContent>
            </StandardStack>
          </Paper>
          <Center>
            <Button type="submit" variant="contained" size="large">
              Send Message
            </Button>
          </Center>
        </HeaderContent>
        <Dialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          title={dialogText.title}
          message={dialogText.message}
        />
      </Form>
    </FormManager>
  );
}
