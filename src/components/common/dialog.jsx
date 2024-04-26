import {
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
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
    </MuiDialog>
  );
}

export default Dialog;
