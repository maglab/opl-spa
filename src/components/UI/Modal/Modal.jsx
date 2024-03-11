import { Box, Button, Modal, Typography } from "@mui/material";

//Split for now
const modalBoxStyling = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "primary.main",
  padding: "16px",
  minHeight: "250px",
  minWidth: "300px",
  maxHeight: "25%",
  maxWidth: "30%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2rem",
};
const modalStyling = {
  height: "100%",
  width: "100%",
};
export function SubmissionModal({ title, response, open, setOpen }) {
  const exitHandler = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={exitHandler}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={modalStyling}
    >
      <Box className="modal-box" sx={modalBoxStyling}>
        <Box className="modal-text" textAlign="center">
          <Typography
            id="modal-title"
            variant="h5"
            paddingTop="0.5rem"
            paddingBottom="0.5rem"
          >
            {title}
          </Typography>
          <Typography variant="body1" id="modal-description">
            {response}
          </Typography>
        </Box>
        <Box className="modal-buttons">
          <Button color="secondary" variant="outlined" onClick={exitHandler}>
            Exit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
