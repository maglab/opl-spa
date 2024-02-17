import { Box, Container, Divider, Typography } from "@mui/material";
import { SubmissionModal } from "../../components/UI/Modal/Modal";

import { useState } from "react";
import OpenProblemForm from "./Form/Form";
import Guidance from "./Form/Guidance";

const INITIAL_STATE = {
  title: "",
  response: "",
};

const typographyStyles = {
  textAlign: "center",
  fontWeight: "bold",
  variant: "h4",
  paddingTop: "40px",
  paddingBottom: "16px",
};

function SubmitPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(INITIAL_STATE);
  return (
    <>
      <Container className="submit-page-container">
        <Box className="header" flex alignItems="center">
          <Typography {...typographyStyles}>Submit an open problem</Typography>
          <Guidance />
          <Divider aria-hidden={true} />
        </Box>
        <Box
          className="open-problems-box"
          paddingTop="2rem"
          paddingBottom="4rem"
        >
          <OpenProblemForm
            setModalOpen={setModalOpen}
            setModalContent={setModalContent}
          />
        </Box>
      </Container>
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
