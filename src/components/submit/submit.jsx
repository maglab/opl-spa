import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { Form } from "formik";
import React, { useState } from "react";
import { useAsyncFn } from "react-use";
import apiProblems from "../../api/apiProblems";
import ContactSection from "./contactSection";
import DetailsSection from "./detailsSection";
import FormManager from "./formManager";
import Guidance from "./guidance";
import ReferenceSection from "./referenceSection";

export default function Submit() {
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [submitState, submit] = useAsyncFn(async (values) => {
    const response = await apiProblems.postProblem({ data: values });
    if (response.status === 201) {
      // Navigate to confirmation page
    } else {
      setOpenErrorDialog(true);
    }
  });

  return (
    <>
      <FormManager onSubmitHandler={submit}>
        <Form>
          <Stack spacing={4}>
            <Paper elevation={2}>
              <Guidance />
            </Paper>
            <Paper elevation={2}>
              <Stack
                p={2}
                spacing={2}
                divider={<Divider orientation="horizontal" />}
              >
                <DetailsSection />
                <ReferenceSection />
                <ContactSection />
              </Stack>
            </Paper>
            <Stack alignItems="center">
              {submitState.loading ? (
                <CircularProgress />
              ) : (
                <Button type="submit" variant="contained" size="large">
                  Submit Problem
                </Button>
              )}
            </Stack>
          </Stack>
        </Form>
      </FormManager>
      <Dialog open={openErrorDialog} onClose={() => setOpenErrorDialog(false)}>
        <DialogTitle>Failed to submit new problem.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The problem has not been successfully submitted due to technical
            issues.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
