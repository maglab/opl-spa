import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog as MuiDialog,
} from "@mui/material";
import React from "react";

function Dialog({ open, setOpen, message, title }) {
  return (
    <MuiDialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}

export default Dialog;
