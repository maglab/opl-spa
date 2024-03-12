import {
  Box,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "mui-image";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import footerLogos from "../assets/footerLogos";
import { getWebApiUrl } from "../config";
import { DefaultMargin } from "./defaultMargin";

export default function Footer() {
  const theme = useTheme();

  return (
    <DefaultMargin bgcolor="primary.dark">
      <Typography
        component="div"
        color="primary.contrastText"
        textAlign="center"
      >
        <Stack spacing={2}>
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
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={5}>
              <Typography variant="caption">
                The project is defined and funded by Impetus Funds in the
                University of Birmingham, Institute of Inflammation and Ageing
              </Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Box>
                <Grid container direction="row" columnSpacing={1}>
                  {footerLogos.map((l) => (
                    <Grid item xs={4}>
                      <Link href={l.link}>
                        <Image src={l.imageSrc} fit="contain" height={60} />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Typography>
    </DefaultMargin>
  );
}
