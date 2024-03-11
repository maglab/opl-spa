import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import heroImage from "../assets/images/question2.png";
import mainPageTexts from "../assets/mainPageTexts.json";

export default function Hero() {
  return (
    <Box>
      <Grid
        container
        direction="row-reverse"
        alignItems="center"
        rowSpacing={2}
        columnSpacing={2}
      >
        <Grid item xs={12} md={4}>
          <Stack direction="row" justifyContent="center">
            <Box sx={{ maxWidth: 350, width: "100%", aspectRatio: "1/1" }}>
              <Image
                src={heroImage}
                sx={{ width: "100%", height: "100%", borderRadius: "100%" }}
              />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack direction="column" spacing={4}>
            <Typography whiteSpace="pre" variant="h4">
              <Typography component="span" variant="h3" color="primary">
                Open Problems
              </Typography>
              {"\nin longevity science"}
            </Typography>
            <Typography textAlign="justify">
              {mainPageTexts.introduction}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={8}>
            <Stack spacing={2}>
              <Typography variant="h5">Let&apos;s begin:</Typography>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    component={RouterLink}
                    to="/open-problems"
                    variant="contained"
                    size="large"
                    sx={{ minWidth: 180 }}
                  >
                    Problem List
                  </Button>
                  <Typography fontWeight="bold">
                    {mainPageTexts.problemButton}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    component={RouterLink}
                    to="/submit-guidelines"
                    variant="contained"
                    size="large"
                    sx={{ minWidth: 180 }}
                  >
                    Submit Problem
                  </Button>
                  <Typography fontWeight="bold">
                    {mainPageTexts.submitButton}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <Typography>Looking for something else?</Typography>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    component={RouterLink}
                    to="/about"
                    variant="outlined"
                    sx={{ minWidth: 100 }}
                  >
                    About
                  </Button>
                  <Typography>{mainPageTexts.aboutButton}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    component={RouterLink}
                    to="/team"
                    variant="outlined"
                    sx={{ minWidth: 100 }}
                  >
                    Team
                  </Button>
                  <Typography>{mainPageTexts.teamButton}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    component={RouterLink}
                    to="/contact"
                    variant="outlined"
                    sx={{ minWidth: 100 }}
                  >
                    Contact us
                  </Button>
                  <Typography>{mainPageTexts.contactButton}</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
