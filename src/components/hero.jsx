import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import heroImage from "../assets/images/question2.png";
import introduction from "../assets/introduction.json";

export default function Hero() {
  return (
    <Grid
      container
      direction="row-reverse"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item xs={6}>
        <Box component="img" src={heroImage} borderRadius="100%" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h3" textAlign="center">
            <Typography component="span" variant="inherit" color="primary">
              Open Problems
            </Typography>
            {" in longevity science"}
          </Typography>
          <Typography>{introduction.mainText}</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained">Open Problems</Button>
            <Button variant="outlined">About us</Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
