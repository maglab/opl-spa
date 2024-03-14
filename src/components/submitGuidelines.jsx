import { Box, Button, Paper } from "@mui/material";
import React from "react";
import Markdown from "react-markdown";
import { Link as RouterLink } from "react-router-dom";
import guidance from "../assets/submitGuidelines.md?raw";
import useExtendedTheme from "../hooks/useExtendedThem";
import Center from "./common/center";
import HeaderContent from "./common/headerContent";
import StandardStack from "./common/standardStack";

export default function SubmitGuidelines() {
  const theme = useExtendedTheme();

  return (
    <HeaderContent header="Before you start...">
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
            Proceed
          </Button>
        </Center>
      </StandardStack>
    </HeaderContent>
  );
}
