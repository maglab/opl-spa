import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import DuplicatedReminder from "./duplicatedReminder";
import ManagedTextField from "./managedTextField";

export default function DetailsSection() {
  return (
    <Stack spacing={4}>
      <Typography variant="h5" textAlign="center">
        Details
      </Typography>
      <Stack spacing={2}>
        <ManagedTextField name="title" label="Title" required />
        <DuplicatedReminder />
        <ManagedTextField
          name="description"
          label="Description"
          required
          multiline
          rows={3}
        />
      </Stack>
    </Stack>
  );
}
