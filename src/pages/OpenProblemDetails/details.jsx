import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  AppBar,
  Button,
  Chip,
  Divider,
  Grid,
  Menu,
  Paper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { useLoaderData, useParams } from "react-router-dom";
import apiAnnotations from "../../api/apiAnnotations";
import useGetApi from "../../utils/hooks/useApi";
import ClassificationTable from "./classificationTable";

function TopBar() {
  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Menu>
          <Button>Test</Button>
        </Menu>
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

function DiscussionSection() {
  return (
    <TabPanel>
      <Typography>
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam harum
        doloribus ex autem veniam? Recusandae minus quos quia perspiciatis
        consequuntur deleniti possimus voluptas tempore quod odit fuga sapiente,
        ullam numquam!
      </Typography>
    </TabPanel>
  );
}

function DiscussionSolution() {
  const [tabState, setTabState] = useState(1);
  const handleChange = (event, newValue) => {
    setTabState(newValue);
  };
  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} typography="h1">
          <Tabs
            textColor="primary"
            value={tabState}
            onChange={handleChange}
            centered
          >
            <TabList>
              <Tab label="DISCUSSION" value={1} />
              <Tab label="SOLUTIONS" value={2} />
            </TabList>
          </Tabs>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default function Details() {
  const { data } = useLoaderData();
  const { id } = useParams();
  return (
    <Grid container xs={12} direction="column" spacing={2}>
      <Grid item xs={12}>
        <TopBar />
      </Grid>
      <Grid container item spacing={2}>
        <Grid item md={3}>
          <ClassificationTable id={id} />
        </Grid>
        <Grid container item md={9} direction="column" spacing={2}>
          <Grid item>
            <Paper>
              <Header data={data} />
            </Paper>
          </Grid>
          <Grid item>
            <DiscussionSolution />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
