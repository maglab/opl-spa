import {
  Button,
  Divider,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FieldArray, useField } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import apiComments from "../../api/apiComments";
import apiPosts from "../../api/apiPosts";
import solutionDescription from "../../assets/descriptions/solution.json";
import ManagedTextField from "../../components/submit/managedTextField";
import ReferenceItem from "../../components/submit/referenceItem";
import newRandomId from "../../utilities/randomId";
import {
  formatFullName,
  setDate,
} from "../../utils/functions/dataManipulation";
import useGetApi from "../../utils/hooks/useApi";
import FormManager from "./formManager";

function Comment({ commentData }) {}

function Post({ postData }) {
  const {
    created_at: date,
    first_name: firstName,
    last_name: lastName,
    full_text: text,
    id,
  } = postData;
  const fullName = formatFullName(firstName, lastName);
  const dateString = setDate(date);
  const { apiData: commentData } = useGetApi(apiComments.getAll, { id });
  return (
    <Grid item container direction="column" spacing={2}>
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
        <Typography> Comments go here</Typography>
      </Grid>
      <Grid item>
        <Stack width="fit-content" padding={0}>
          <Button variant="outlined" size="small">
            Comment
          </Button>
        </Stack>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
    </Grid>
  );
}

function PostReferenceSection() {
  const [field] = useField("references");
  return (
    <Stack spacing={4}>
      <FieldArray name="references">
        {({ push, remove }) => (
          <Stack direction="column" spacing={2}>
            {field.value.map((reference, index) => (
              <ReferenceItem key={reference.id} index={index} remove={remove} />
            ))}
            <Stack alignItems="center" spacing={2}>
              <Button
                variant="outlined"
                onClick={() =>
                  push({ id: newRandomId(), type: "DOI", value: "" })
                }
              >
                Add Reference
              </Button>
            </Stack>
          </Stack>
        )}
      </FieldArray>
    </Stack>
  );
}

function PostForm({ type }) {
  const submitHandler = () => {
    console.log("test");
  };
  const titleString = type === "discussion" ? "Your thoughts" : "Your solution";

  return (
    <FormManager onSubmitHandler={submitHandler}>
      <Stack padding={2} spacing={2} direction="column" width="100%">
        <ManagedTextField
          name="post"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          required
          label={titleString}
        />
        <ManagedTextField label="Comment as:" name="name" />
        <Stack direction="column">
          <PostReferenceSection />
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center" paddingY={2}>
          <Button variant="contained" type="submit" size="large">
            Submit
          </Button>
        </Stack>
      </Stack>
    </FormManager>
  );
}

function calculatePagination(count, pageSize) {
  return Math.ceil(count / pageSize);
}
export function PostSection({ sectionType, sectionDescription }) {
  const { id } = useParams();
  const [pagination, setPagination] = useState(1);
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const pageNumbers = useMemo(
    () => calculatePagination(count, 6),
    [pagination, count]
  );

  useEffect(() => {
    async function getData() {
      const response = await apiPosts.forOpenProblem({
        id,
        params: { p: pagination, page_size: 6 },
      });
      if (response.data) {
        const { data } = response;
        setCount(data.count);
        setPosts(data.results);
      }
    }
    getData();
  }, [pagination]);

  return (
    <Paper>
      <Grid container spacing={2} padding={2} direction="column">
        <Grid item xs={12}>
          <Typography variant="h5" textAlign="center">
            {sectionType === "discussion" ? "Discussion" : "Solutions"}
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography variant="body1" fontWeight="bold">
            {sectionDescription}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {posts && posts.length > 0 ? (
          posts.map((post) => <Post postData={post} key={post.id} />)
        ) : (
          <Grid item xs={12}>
            <Typography variant="subtitle1" textAlign="center">
              No submitted {sectionType}s.
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Stack alignItems="center">
            <Pagination size="small" count={pageNumbers} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <PostForm type={sectionType} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export function DiscussionSection() {
  return (
    <PostSection
      sectionType="discussion"
      sectionDescription={solutionDescription.mainText}
    />
  );
}

export function SolutionSection() {
  return <PostSection sectionType="solution" sectionDescription="" />;
}
