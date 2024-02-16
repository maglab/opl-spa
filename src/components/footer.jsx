import { useTheme } from "@emotion/react";
import { Email } from "@mui/icons-material";
import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import addressLines from "../assets/contacts/addressLines.json";
import people from "../assets/contacts/people.json";
import bhamLogo from "../assets/images/bham-logo.png";
import rejuvenomicsLogo from "../assets/images/rejuvenomics-logo.png";

export default function Footer() {
  const theme = useTheme();
  const addressText = addressLines.join("\n");

  return (
    <Box
      sx={{
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        bgcolor: blueGrey[900],
      }}
      display="flex"
      justifyContent="center"
    >
      <Grid container maxWidth="md" spacing={theme.spacing(1)}>
        <Grid item xs={12}>
          <Typography color="common.white" align="center" variant="h4">
            Contact Us
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color="common.white" sx={{ whiteSpace: "pre-wrap" }}>
            {addressText}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" flexDirection="row-reverse">
            <Stack spacing={theme.spacing(1)}>
              {people.map((i) => (
                <Box key={i.name}>
                  <Typography color="common.white">{i.name}</Typography>
                  <Stack direction="row" spacing={theme.spacing(1)}>
                    <Email sx={{ color: "white" }} />
                    <Link href={`mailto:${i.email}`}>{i.email}</Link>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <img
              style={{
                objectFit: "contain",
                width: "300px",
                height: "120px",
              }}
              alt=""
              src={bhamLogo}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <img
              style={{
                objectFit: "contain",
                width: "300px",
                height: "120px",
              }}
              alt=""
              src={rejuvenomicsLogo}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
