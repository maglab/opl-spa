import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Container } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { Form } from "formik";
import React, { useState } from "react";
import { postProblem } from "../../apiNew/apiProblems";
import Center from "../common/center";
import StandardStack from "../common/standardStack";
import TagsAnnotationsSection from "./annotationsTagsSections";
import ContactSection from "./contactSection";
import formatSubmitData from "./dataFormatting";
import DetailsSection from "./detailsSection";
import FormManager from "./formManager";
import ReferencesSection from "./referencesSection";

export default function Submit() {
  // const theme = useExtendedTheme();
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: (postData) => postProblem(postData),
    onError: () => {
      setOpenErrorDialog(true);
    },
  });

  const postHandler = (values) => {
    const formattedData = formatSubmitData(values);
    mutate(formattedData);
  };

  return (
    <>
      <FormManager onSubmitHandler={postHandler}>
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
                {isPending ? (
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
            {error && error.message}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
