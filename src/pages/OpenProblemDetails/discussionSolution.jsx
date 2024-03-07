import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Divider, Grid, Paper, Stack, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import apiPosts from "../../api/apiSubmissions";
import useGetApi from "../../utils/hooks/useApi";

function Post({ postData }) {
  console.log(postData);
  return (
    <Grid container direction="column">
      <Divider />
      <Grid
        container
        item
        direction="row"
        xs={12}
        justifyContent="space-between"
      >
        <Grid item>
          <Typography variant="body2"> User goes here</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2"> Date: XXXXXX</Typography>
        </Grid>
      </Grid>
      <Divider />
    </Grid>
  );
}

function DiscussionSection({ value }) {
  const { id } = useParams();
  const { apiData: posts, error } = useGetApi(
    apiPosts.forOpenProblem,
    { id },
    {}
  );

  return (
    <TabPanel value={value}>
      <Stack>
        <Post postData={posts[0]} />
      </Stack>
    </TabPanel>
  );
}

export default function DiscussionSolution() {
  const [tabState, setTabState] = useState(1);
  const handleChange = (event, newValue) => {
    setTabState(newValue);
  };
  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} typography="h1">
          <TabContext value={tabState}>
            <TabList onChange={handleChange} centered>
              <Tab label="DISCUSSION" value={1} />
              <Tab label="SOLUTIONS" value={2} />
            </TabList>
            <DiscussionSection value={1} />
          </TabContext>
        </Grid>
      </Grid>
    </Paper>
  );
}
