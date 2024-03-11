import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import apiPosts from "../../api/apiPosts";
import {
  formatFullName,
  setDate,
} from "../../utils/functions/dataManipulation";
import useGetApi from "../../utils/hooks/useApi";
import FormManager from "./formManager";
import ManagedTextField from "./managedTextField";

function Post({ postData }) {
  const {
    created_at: date,
    first_name: firstName,
    last_name: lastName,
    full_text: text,
  } = postData;
  const fullName = formatFullName(firstName, lastName);
  const dateString = setDate(date);
  return (
    <Grid item container direction="column" spacing={2} margin={0}>
      <Divider />
      <Grid
        container
        item
        direction="row"
        justifyContent="space-between"
        padding={2}
      >
        <Grid item>
          <Typography variant="body2">Posted by: {fullName}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{dateString}</Typography>
        </Grid>
      </Grid>
      <Grid item className="post">
        <Typography variant="body1"> {text}</Typography>
      </Grid>
      <Grid item>
        <Stack width="fit-content" padding={0}>
          <Button variant="outlined" size="small">
            Reply
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

function PostForm({ type }) {
  const submitHandler = console.log("send");

  return (
    <FormManager onSubmitHandler={submitHandler}>
      <Stack padding={2} spacing={2} direction="column">
        <Typography variant="h6"> Your thoughts</Typography>
        <ManagedTextField
          variant="outlined"
          multiline
          minRows={3}
          fullWidth
          required
          label="Your thoughts"
        />
        <ManagedTextField label="Comment as:" />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined"> Clear </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormManager>
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
      <Grid container spacing={2} padding={2}>
        {posts.results && posts.results.length > 0 ? (
          posts.results.map((post) => <Post postData={post} key={post.id} />)
        ) : (
          <Typography variant="subtitle1" textAlign="center">
            None
          </Typography>
        )}
        <Grid item xs={12}>
          <PostForm />
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default function DiscussionSolution() {
  const [tabState, setTabState] = useState("discussion");
  const handleChange = (event, newValue) => {
    setTabState(newValue);
  };
  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} typography="h1">
          <TabContext value={tabState}>
            <TabList onChange={handleChange} centered>
              <Tab label="DISCUSSION" value="discussion" />
              <Tab label="SOLUTIONS" value="solutuion" />
            </TabList>
            <DiscussionSection value="discussion" />
          </TabContext>
        </Grid>
      </Grid>
    </Paper>
  );
}
