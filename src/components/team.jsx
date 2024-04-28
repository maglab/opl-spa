import EmailIcon from "@mui/icons-material/Email";
import { Box, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import people from "../assets/team/people";

export default function Team() {
  return (
    <Stack alignItems="center" spacing={4}>
      <Typography variant="h5">Meet The Team</Typography>
      <Box>
        <Grid container justifyContent="center" spacing={4}>
          {people.map((p) => (
            <Grid key={p.email} item xs={12} sm={6}>
              <Paper elevation={1}>
                <Stack p={2} spacing={4}>
                  <Box>
                    <Box
                      sx={{
                        width: "100%",
                        aspectRatio: "1/1",
                      }}
                    >
                      <Image
                        src={p.photoSrc}
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "100%",
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="h5" fontWeight="bold" textAlign="center">
                    {p.name}
                  </Typography>
                  <Stack spacing={2}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {p.position}
                    </Typography>
                    <Typography
                      fontStyle="italic"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {p.introduction}
                    </Typography>
                    <Stack alignItems="center">
                      <Link href={`mailto:${p.email}`}>
                        <Stack direction="row" spacing={1}>
                          <EmailIcon />
                          <Typography>{p.email}</Typography>
                        </Stack>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}
