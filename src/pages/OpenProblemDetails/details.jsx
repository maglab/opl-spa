import {
  AppBar,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

import { useLoaderData, useParams } from "react-router-dom";
import apiAnnotations from "../../api/apiAnnotations";
import useGetApi from "../../utils/hooks/useApi";
import ClassificationTable from "./classificationTable";
import { DiscussionSection, SolutionSection } from "./discussionSolution";

function TopBar() {
  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        {/* <Menu>
          <Button>Test</Button>
        </Menu> */}
      </Toolbar>
    </AppBar>
  );
}

function Header({ data }) {
  const { title, description } = data;
  const { id } = useParams();
  // Subject will be tags:
  const params = { annotation: "subject", id };
  const { apiData: tags } = useGetApi(
    apiAnnotations.getAnnotationsForProblem,
    params,
    []
  );
  return (
    <Stack spacing={2} padding={2}>
      <Typography variant="h5"> {title} </Typography>
      <Divider />
      <Typography variant="body1"> {description && description}</Typography>
      <Divider />
      <Stack spacing={2} direction="row">
        {tags &&
          tags.map((tag) => (
            <Chip color="primary" label={tag.title} key={tag.id} />
          ))}
      </Stack>
    </Stack>
  );
}

export default function Details() {
  const { data } = useLoaderData();
  const { id } = useParams();
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <TopBar />
      </Grid>
      <Grid container item spacing={2}>
        <Grid item md={3}>
          <ClassificationTable id={id} />
        </Grid>
        <Grid container item md={9} direction="column" spacing={4}>
          <Grid item>
            <Paper>
              <Header data={data} />
            </Paper>
          </Grid>
          <Grid item>
            <DiscussionSection />
          </Grid>
          <Grid item>
            <SolutionSection />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
