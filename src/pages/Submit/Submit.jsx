import { Box, Container, Typography } from "@mui/material";
import { SubmissionModal } from "../../components/UI/Modal/Modal";

import { useState } from "react";
import OpenProblemForm from "./Form/Form";
import Guidance from "./Form/Guidance";

function SubmitPage() {
  const [modalOpen, setModalOpen] = useState();
  return (
    <Container>
      <Box className="header" flex alignItems="center">
        <Typography
          className="form-title text-xl font-bold md:text-2xl pb-4 pt-10"
          textAlign="center"
          fontWeight="bold"
          variant="h4"
        >
          Submit an open problem
        </Typography>
        <Guidance />
        <hr className="pb-6" />
      </Box>
      <OpenProblemForm setModalOpen={setModalOpen} />
      <SubmissionModal
        open={modalOpen}
        title="Test title"
        response="Vero optio autem quibusdam asperiores atque iusto Ducimus, tempora? Veniam reiciendis velit officiis sint impedit hic.
        "
      />
    </Container>
  );
}
export default SubmitPage;
