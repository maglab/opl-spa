import { Button, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { Form } from "formik";
import React, { useState } from "react";
import { postProblem } from "../../apiNew/apiProblems";
import dialogTextJson from "../../assets/dialog/submitOpenProblem.json";
import Center from "../common/center";
import Dialog from "../common/dialog";
import StandardStack from "../common/standardStack";
import TagsAnnotationsSection from "./annotationsTagsSections";
import ContactSection from "./contactSection";
import formatSubmitData from "./dataFormatting";
import DetailsSection from "./detailsSection";
import FormManager from "./formManager";
import ReferencesSection from "./referencesSection";

export default function Submit() {
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [dialogText, setDialogText] = useState({ title: "", message: "" });

  const { mutate, isPending } = useMutation({
    mutationFn: (postData) => postProblem(postData),
    onError: () => {
      setOpenErrorDialog(true);
      const { title, message } = dialogTextJson.error;
      setDialogText({ title, message });
    },
    onSuccess: () => {
      setOpenErrorDialog(true);
      const { title, message } = dialogTextJson.success;
      setDialogText({ title, message });
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
      <Dialog
        open={openErrorDialog}
        setOpen={setOpenErrorDialog}
        title={dialogText.title}
        message={dialogText.message}
      />
    </>
  );
}
