import { AppBar, Button, Grid, Link, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logoSvg from "../assets/svg/OpenLongevityLogo.svg";
import StandardGrid from "./common/standardGrid";
import StandardStack from "./common/standardStack";
import { DefaultMargin } from "./defaultMargin";

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "common.white" }}>
      <DefaultMargin yPadding={0.5}>
        <StandardGrid
          minor
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm>
            <StandardStack
              direction="row"
              justifyContent={{ xs: "center", sm: "left" }}
              alignItems="flex-end"
            >
              <Stack height="100%" justifyContent="center">
                <Link component={RouterLink} to="/">
                  <Image src={logoSvg} height={48} />
                </Link>
              </Stack>
              <Typography variant="caption">
                build: {import.meta.env.VITE_BUILD_VERSION}
              </Typography>
            </StandardStack>
          </Grid>
          <Grid item>
            <StandardGrid minor alignItems="center">
              <Grid item xs />
              <Grid item>
                <StandardStack minor direction="row">
                  <Button
                    component={RouterLink}
                    to="/submit-guidelines"
                    variant="contained"
                  >
                    Submit
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/open-problems"
                    variant="contained"
                  >
                    Problems
                  </Button>
                  <Button component={RouterLink} to="/login" variant="outlined">
                    Login / Register
                  </Button>
                </StandardStack>
              </Grid>
            </StandardGrid>
          </Grid>
        </StandardGrid>
      </DefaultMargin>
    </AppBar>
  );
}
