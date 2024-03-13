import CloseIcon from "@mui/icons-material/Close";
import { Chip, IconButton, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

export default function SearchCriteriaChip({
  subject,
  subjectColor,
  onDeleteClicked,
}) {
  return (
    <Stack
      p={1}
      direction="row"
      spacing={1}
      bgcolor={grey[500]}
      borderRadius={16}
    >
      <Chip color={subjectColor} label={subject} size="small" />
      <Typography color="secondary.contrastText">Text here</Typography>
      <IconButton
        aria-label="delete"
        size="small"
        sx={{ width: 24, height: 24, color: "secondary.contrastText" }}
        onClick={onDeleteClicked}
      >
        <CloseIcon sx={{ width: 24, height: 24 }} />
      </IconButton>
    </Stack>
  );
}
