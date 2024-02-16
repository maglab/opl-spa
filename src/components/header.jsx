import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logoSvg from "../assets/svg/OpenLongevityLogo.svg";

export default function Header() {
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex" }}>
          <Stack
            direction="row"
            alignItems="flex-end"
            spacing={theme.spacing(1)}
          >
            <Link href="https://longevityknowledge.com">
              <Box component="img" src={logoSvg} sx={{ height: "48px" }} />
            </Link>
            <Typography variant="caption">
              build: {import.meta.env.VITE_BUILD_VERSION}
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={theme.spacing(2)}>
            <Button
              component={RouterLink}
              to="/"
              color="secondary"
              variant="text"
              size="small"
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              color="secondary"
              variant="outlined"
              size="small"
            >
              Login / Register
            </Button>
            <Button
              component={RouterLink}
              to="/open-problems"
              color="secondary"
              variant="contained"
              size="small"
            >
              Open Problems
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
