import { AppBar, Button, Grid, Link, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logoSvg from "../assets/svg/OpenLongevityLogo.svg";
import { DefaultMargin } from "./defaultMargin";

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "common.white" }}>
      <DefaultMargin yPadding={2}>
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
                <Link component={RouterLink} to="/">
                  <Image src={logoSvg} height={48} />
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
                    to="/submit-guidelines"
                    variant="contained"
                  >
                    Submit
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/open-problems/submit"
                    variant="outlined"
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
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DefaultMargin>
    </AppBar>
  );
}
