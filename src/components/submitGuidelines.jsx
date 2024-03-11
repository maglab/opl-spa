import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Markdown from "react-markdown";
import { Link as RouterLink } from "react-router-dom";
import guidance from "../assets/submitGuidelines.md?raw";

export default function SubmitGuidelines() {
  return (
    <Stack alignItems="center" spacing={4}>
      <Typography variant="h5">Before you start...</Typography>
      <Paper elevation={1}>
        <Box p={2}>
          <Markdown>{guidance}</Markdown>
        </Box>
      </Paper>
      <Button
        component={RouterLink}
        to="/submit"
        variant="contained"
        size="large"
      >
        Proceed
      </Button>
    </Stack>
  );
}
