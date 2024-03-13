import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import CommentIcon from "@mui/icons-material/Comment";
import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import { blue } from "@mui/material/colors";
import { FieldArray, useField } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import apiComments from "../../api/apiComments";
import apiPosts from "../../api/apiPosts";
import solutionDescription from "../../assets/descriptions/solution.json";
import FormManagedTextField from "../../components/formManagedTextField";
import ReferenceItem from "../../components/submit/referenceItem";
import newRandomId from "../../utilities/randomId";
import {
  formatFullName,
  setDate,
} from "../../utils/functions/dataManipulation";
import FormManager from "./formManager";

function calculatePagination(count, pageSize) {
  return Math.ceil(count / pageSize);
}

function Comment({ commentData }) {
  const { full_text: fullText, alias, created_at: date } = commentData;
  const dateString = setDate(date);
  const displayName = alias || "Anonymous";
  return (
    <ListItem>
      <ListItemIcon>
        <CommentIcon />
      </ListItemIcon>
      <ListItemText
        primary={fullText}
        secondaryTypographyProps={{ color: "primary" }}
        secondary={`${displayName} ${dateString}`}
      />
    </ListItem>
  );
}

function CommentSection({ id }) {
  const [pagination, setPagination] = useState(1);
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await apiComments.getAll({
        id,
        params: { p: pagination, page_size: 6 },
      });
      if (response.data) {
        const { data } = response;
        setCount(data.count);
        setComments(data.results);
      }
    }
    getData();
  }, [pagination]);

  if (comments.length > 0) {
    return (
      <Stack alignItems="flex-start" width="100%">
        <Stack pl={4} width="100%" alignItems="center">
          <List sx={{ width: "100%" }}>
            {comments &&
              comments.map((comment) => (
                <Comment commentData={comment} key={comment.id} />
              ))}
          </List>
        </Stack>
        <Button> View more</Button>
      </Stack>
    );
  }
}

function PostMetaData({ postData }) {
  const {
    created_at: date,
    first_name: firstName,
    last_name: lastName,
  } = postData;
  const dateString = setDate(date);
  const fullName = formatFullName(firstName, lastName);
  return (
    <Stack alignItems="flex-end">
      <Stack width="fit-content" bgcolor={blue[50]} padding={0.5} spacing={0.5}>
        <Typography variant="body2"> Posted {dateString}</Typography>
        <Typography variant="body2" color="primary.light">
          {fullName}
        </Typography>
      </Stack>
    </Stack>
  );
}

function PostContent({ postData }) {
  const { full_text: fullText, id } = postData;
  return (
    <>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item className="post" xs={12}>
        <Typography variant="body1"> {fullText}</Typography>
      </Grid>
      <Grid item className="references" xs={12}>
        <Typography variant="body1" sx={{ textDecoration: "underline" }}>
          References
        </Typography>
        <Typography> None </Typography>
      </Grid>
      <Grid
        item
        container
        className="meta"
        justifyContent="space-between"
        alignItems="flex-end"
        xs={12}
        direction="row"
      >
        <Grid item xs="auto">
          <Stack padding={0} alignItems="flex-end">
            <Button variant="outlined" size="small">
              Comment
            </Button>
          </Stack>
        </Grid>
        <Grid item xs="auto">
          <PostMetaData postData={postData} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <CommentSection id={id} />
      </Grid>
    </>
  );
}

function Post({ postData, type }) {
  if (type === "discussion") {
    return (
      <Grid container spacing={2}>
        <PostContent postData={postData} />
      </Grid>
    );
  }
  return (
    <Grid item container direction="row" alignItems="flex-start" spacing={2}>
      <Grid item xs={1}>
        <Stack justifyContent="center" alignItems="center">
          <IconButton size="large" color="primary">
            <ArrowCircleUpIcon />
          </IconButton>
          <Typography>0</Typography>
          <IconButton size="large" color="primary">
            <ArrowCircleDownIcon />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item container direction="column" spacing={2} xs={11}>
        <PostContent postData={postData} />
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
        <FormManagedTextField
          name="post"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          required
          label={titleString}
        />
        <FormManagedTextField label="Comment as:" name="name" />
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
    <Grid container spacing={2} padding={2} direction="column" width="100%">
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
      <Grid item container xs={12}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post postData={post} key={post.id} type={sectionType} />
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="subtitle1" textAlign="center" width="100%">
              No submitted {sectionType}s.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Grid item xs={12}>
        <Stack alignItems="center">
          <Pagination size="small" count={pageNumbers} />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <PostForm type={sectionType} />
      </Grid>
    </Grid>
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

export function DiscussionSolution() {
  const [tabValue, setTabValue] = useState("solution");
  return (
    <Paper>
      <TabContext value={tabValue}>
        <Stack width="100%" justifyContent="center" alignItems="center">
          <TabList onChange={(event, value) => setTabValue(value)}>
            <Tab value="solution" label="SOLUTION" />
            <Tab value="discussion" label="DISCUSSION" />
          </TabList>
        </Stack>

        <TabPanel value="solution">
          <SolutionSection tabValue="solution" />
        </TabPanel>
        <TabPanel value="discussion">
          <DiscussionSection />
        </TabPanel>
      </TabContext>
    </Paper>
  );
}
