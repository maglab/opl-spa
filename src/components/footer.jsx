import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import footerLogos from "../assets/footerLogos";
import { getWebApiUrl } from "../config";
import StandardGrid from "./common/standardGrid";
import StandardStack from "./common/standardStack";
import { DefaultMargin } from "./defaultMargin";

export default function Footer() {
  return (
    <DefaultMargin bgcolor="primary.dark">
      <Typography
        component="div"
        color="primary.contrastText"
        textAlign="center"
      >
        <StandardGrid main columnSpacing={12} direction="row">
          <Grid item xs={12} md={5}>
            <StandardStack minor>
              <Typography variant="caption">
                The project is defined and funded by Impetus Funds in the
                University of Birmingham, Institute of Inflammation and Ageing
              </Typography>
              <Box>
                <Grid container direction="row" columnSpacing={1}>
                  {footerLogos.map((l) => (
                    <Grid item key={l.name} xs={4}>
                      <Link href={l.link}>
                        <Image src={l.imageSrc} fit="contain" height={60} />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </StandardStack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Stack spacing={1} alignItems="flex-start">
                  <Link component={RouterLink} to="/">
                    Home
                  </Link>
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
                    About this project
                  </Link>
                  <Link component={RouterLink} to="team">
                    Our team
                  </Link>
                  <Link component={RouterLink} to="contact">
                    Contact us
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
          </Grid>
        </StandardGrid>
      </Typography>
    </DefaultMargin>
  );
}
