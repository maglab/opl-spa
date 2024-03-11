import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import FormManagedTextField from "../formManagedTextField";
import DuplicatedReminder from "./duplicatedReminder";

export default function DetailsSection() {
  return (
    <Stack spacing={4}>
      <Typography variant="h5" textAlign="center">
        Details
      </Typography>
      <Stack spacing={2}>
        <FormManagedTextField
          name="title"
          label="Title"
          size="small"
          multiline
          required
        />
        <DuplicatedReminder />
        <FormManagedTextField
          name="description"
          label="Description"
          required
          multiline
          rows={6}
        />
      </Stack>
    </Stack>
  );
}
