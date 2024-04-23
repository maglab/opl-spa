import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Container } from "@mui/system";
import { Form } from "formik";
import React, { useState } from "react";
import { useAsyncFn } from "react-use";
import Center from "../common/center";
import StandardStack from "../common/standardStack";
import TagsAnnotationsSection from "./annotationsTagsSections";
import ContactSection from "./contactSection";
import DetailsSection from "./detailsSection";
import FormManager from "./formManager";
import ReferencesSection from "./referencesSection";

export default function Submit() {
  // const theme = useExtendedTheme();
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [submitState, submit] = useAsyncFn(async (values) => {
    console.log(values);
    // const response = await apiProblems.postProblem({ data: values });
    // if (response.status === 201) {
    //   // Navigate to confirmation page
    // } else {
    //   setOpenErrorDialog(true);
    // }
  });

  return (
    <>
      <FormManager onSubmitHandler={submit}>
        <Container maxWidth="md">
          <Form>
            <StandardStack main>
              <StandardStack minor>
                <DetailsSection />
                <ReferencesSection />
                <TagsAnnotationsSection />
                <ContactSection />
              </StandardStack>
              <Center>
                {submitState.loading ? (
                  <CircularProgress />
                ) : (
                  <Button type="submit" variant="contained" size="large">
                    Submit Problem
                  </Button>
                )}
              </Center>
            </StandardStack>
          </Form>
        </Container>
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
