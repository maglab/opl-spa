import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Markdown from "react-markdown";
import { Link as RouterLink } from "react-router-dom";
import { useAsync } from "react-use";
import guidance from "../assets/submitGuidelines.md";

export default function SubmitGuidelines() {
  const state = useAsync(async () => {
    const response = await fetch(guidance);
    return response.text();
  });

  return (
    <Stack alignItems="center" spacing={3}>
      <Typography variant="h4">Before you start...</Typography>
      <Paper elevation={1}>
        <Box p={2}>
          <Markdown>{state.value ? state.value : ""}</Markdown>
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
