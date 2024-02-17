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

const openProblemsBoxStyles = {
  paddingTop: "2rem",
  paddingBottom: "4rem",
};

function SubmitPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(INITIAL_STATE);
  return (
    <Container>
      <Box className="header" flex alignItems="center">
        <Typography {...typographyStyles}>Submit an open problem</Typography>
        <Guidance />
        <Divider aria-hidden={true} />
      </Box>
      <Box className="open-problems-box" {...openProblemsBoxStyles}>
        <OpenProblemForm
          setModalOpen={setModalOpen}
          setModalContent={setModalContent}
        />
      </Box>

      <SubmissionModal
        open={modalOpen}
        title={modalContent.title}
        response={modalContent.response}
      />
    </Container>
  );
}
export default SubmitPage;
