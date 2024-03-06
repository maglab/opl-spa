import { Email } from "@mui/icons-material";
import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import React from "react";
import addressLines from "../assets/contacts/addressLines.json";
import people from "../assets/contacts/people.json";
import bhamLogo from "../assets/images/bham-logo.png";
import rejuvenomicsLogo from "../assets/images/rejuvenomics-logo.png";
import { DefaultMargin } from "./defaultMargin";

export default function Footer() {
  const addressText = addressLines.join("\n");
  const logoStyle = { width: "300px", height: "120px", objectFit: "contain" };
  const textColor = "common.white";

  return (
    <DefaultMargin bgcolor="secondary.main" yPadding={2}>
      <Grid container maxWidth="md" rowSpacing={6}>
        <Grid item xs={12}>
          <Typography color={textColor} align="center" variant="h4">
            Contact Us
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            color={textColor}
            whiteSpace="pre-wrap"
            textAlign={{ xs: "center", sm: "left" }}
          >
            {addressText}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            justifyContent={{
              xs: "center",
              sm: "flex-end",
            }}
          >
            <Grid item>
              <Stack spacing={1}>
                {people.map((i) => (
                  <Typography
                    key={i.email}
                    color={textColor}
                    whiteSpace="pre-wrap"
                  >
                    {`${i.name}\n`}
                    <Email /> <Link href={`mailto:${i.email}`}>{i.email}</Link>
                  </Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent="center">
            <Box component="img" style={logoStyle} src={bhamLogo} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent="center">
            <Box component="img" style={logoStyle} src={rejuvenomicsLogo} />
          </Box>
        </Grid>
      </Grid>
    </DefaultMargin>
  );
}
