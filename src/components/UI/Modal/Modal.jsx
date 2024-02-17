import { Box, Button, Modal, Typography } from "@mui/material";

//Split for now
const modalBoxStyling = {
  position: "absolute",
  top: "50%",
  left: "-50%",
  transform: "translateY(-50%)",
  transform: "translateX(-50%)",
  bgColor: "primary.main",
  maxHeight: "250px",
  width: "100%",
  height: "100%",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1.5rem",
  alignItems: "center",
};
export function SubmissionModal({ title, response, open, setOpen }) {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="modal-box" sx={modalBoxStyling}>
        <Box className="modal-text w-full">
          <Typography id="modal-title" variant="h5">
            {title}
          </Typography>
          <Typography variant="body1" id="modal-description">
            {response}
          </Typography>
        </Box>
        <Box className="modal-buttons">
          <Button>Exit</Button>
        </Box>
      </Box>
    </Modal>
  );
}
