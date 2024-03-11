import { Grid, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { getWebApiUrl } from "../config";
import { DefaultMargin } from "./defaultMargin";

export default function Footer() {
  return (
    <DefaultMargin bgcolor="primary.dark" yPadding={2}>
      <Typography
        component="div"
        color="primary.contrastText"
        textAlign="center"
      >
        <Grid container justifyContent="space-between">
          <Grid item>
            <Stack spacing={1} alignItems="flex-start">
              <Link component={RouterLink} to="open-problems">
                Problem list
              </Link>
              <Link component={RouterLink} to="submit-guidelines">
                Submit problem
              </Link>
            </Stack>
          </Grid>
          <Grid item>
            <Stack spacing={1} alignItems="flex-start">
              <Link component={RouterLink} to="about">
                About
              </Link>
              <Link component={RouterLink} to="team">
                Team
              </Link>
              <Link component={RouterLink} to="contact">
                Contact
              </Link>
            </Stack>
          </Grid>
          <Grid item>
            <Stack spacing={1} alignItems="flex-start">
              <Link href={`${getWebApiUrl()}/swagger`}>API</Link>
              <Link href="https://github.com/maglab/opl-web-api">
                Source code &#40;API&#41;
              </Link>
              <Link href="https://github.com/maglab/opl-spa">
                Source code &#40;SPA&#41;
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Typography>
    </DefaultMargin>
  );
}
