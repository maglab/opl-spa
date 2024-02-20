import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { SubmissionModal } from "../../components/UI/Modal/Modal";

import OpenProblemForm from "./Form";
import Guidance from "./Guidance";

const INITIAL_STATE = {
  title: "",
  response: "",
};

function SubmitPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(INITIAL_STATE);
  return (
    <>
      <Stack container direction="column" spacing={3}>
        <Typography textAlign="center" fontWeight="bold" variant="h4" py={4}>
          Submit an open problem
        </Typography>
        <Guidance />
        <OpenProblemForm
          setModalOpen={setModalOpen}
          setModalContent={setModalContent}
        />
      </Stack>
      <SubmissionModal
        open={modalOpen}
        title={modalContent.title}
        response={modalContent.response}
        setOpen={setModalOpen}
      />
    </>
  );
}
export default SubmitPage;
