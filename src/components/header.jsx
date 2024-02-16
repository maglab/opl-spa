import {
  AppBar,
  Box,
  Button,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logoSvg from "../assets/svg/OpenLongevityLogo.svg";
import { DefaultMargin } from "./defaultMargin";

export default function Header() {
  return (
    <AppBar position="static">
      <DefaultMargin yPadding={0.5}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          rowSpacing={2}
        >
          <Grid item xs={12} sm>
            <Stack
              direction="row"
              justifyContent={{ xs: "center", sm: "left" }}
              alignItems="flex-end"
              spacing={1}
            >
              <Stack height="100%" justifyContent="center">
                <Link href="https://longevityknowledge.com">
                  <Box component="img" src={logoSvg} height={48} />
                </Link>
              </Stack>
              <Typography variant="caption">
                build: {import.meta.env.VITE_BUILD_VERSION}
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item xs />
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Button
                    component={RouterLink}
                    to="/"
                    color="secondary"
                    variant="text"
                  >
                    Home
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/login"
                    color="secondary"
                    variant="outlined"
                  >
                    Login / Register
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/open-problems"
                    color="secondary"
                    variant="contained"
                  >
                    Open Problems
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DefaultMargin>
    </AppBar>
  );
}
