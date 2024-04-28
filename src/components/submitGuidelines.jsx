import { Box, Button, Paper } from "@mui/material";
import React from "react";
import Markdown from "react-markdown";
import { Link as RouterLink } from "react-router-dom";
import guidance from "../assets/submitGuidelines.md?raw";
import useExtendedTheme from "../theme/useExtendedTheme";
import Center from "./common/center";
import StandardStack from "./common/standardStack";

export default function SubmitGuidelines() {
  const theme = useExtendedTheme();

  return (
    <StandardStack main>
      <Paper elevation={1}>
        <Box p={theme.layout.padding}>
          <Markdown>{guidance}</Markdown>
        </Box>
      </Paper>
      <Center>
        <Button
          component={RouterLink}
          to="/submit"
          variant="contained"
          size="large"
        >
          I Understand, Proceed
        </Button>
      </Center>
    </StandardStack>
  );
}
