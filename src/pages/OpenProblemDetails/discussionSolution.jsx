import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import CommentIcon from "@mui/icons-material/Comment";
import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import CommentFormManager from "./commentFormManager";
import PostFormManager from "./postFormManager";

function calculatePagination(count, pageSize) {
  return Math.ceil(count / pageSize);
}

function SubmissionDialog({ open, setOpen, title, message }) {
  return (
    <Dialog open={open}>
      <Stack width="100%" alignItems="center" spacing={2} p={2}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Close
        </Button>
      </Stack>
    </Dialog>
  );
}

function CommentForm({ id }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    message: "",
  });
  const onSubmitHandler = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    setSubmitting(true);
    try {
      const updatedValues = { ...values, post: id }; // Set the post parameter.
      const response = await apiComments.post({ id, data: updatedValues });
      if (response.status === 201) {
        resetForm();
        setDialogOpen(true);
        setDialogContent({
          title: "Success",
          message: "Your comment has been posted and is under review",
        });
      }
    } catch (error) {
      setErrors({ submit: error.message });
      setDialogContent({ title: "Unsuccesful", message: error.message });
    }
    setSubmitting(false);
  };
  return (
    <CommentFormManager onSubmitHandler={onSubmitHandler}>
      <Stack spacing={2} width="100%" alignItems="center">
        <FormManagedTextField
          name="full_text"
          multiline
          rows={3}
          required
          size="small"
          label="Your comment"
        />
        <FormManagedTextField name="alias" size="small" label="Comment as" />
        <Stack width="fit-content" alignContent="center">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
        {dialogOpen && (
          <SubmissionDialog
            open={dialogOpen}
            setOpen={setDialogOpen}
            title={dialogContent.title}
            message={dialogContent.message}
          />
        )}
      </Stack>
    </CommentFormManager>
  );
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
  const [pageSize, setPageSize] = useState(3);
  const [nextUrl, setNextUrl] = useState(null);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);

  // Allow the user to get all comments - set the number of comments retrieved by total number of comments in api (count)
  useEffect(() => {
    async function getData() {
      const response = await apiComments.getAll({
        id,
        params: { page_size: pageSize },
      });
      if (response.data) {
        const { data } = response;
        setComments(data.results);
        setNextUrl(data.next);
        setCount(data.count);
      } else {
        setError(true);
      }
    }
    getData();
  }, [pageSize]);

  const getAllHandler = () => {
    if (!nextUrl) return;
    setPageSize(count);
  };
  const clearHandler = () => {
    setPageSize(3);
  };
  if (error) {
    return (
      <Stack width="100%" justifyContent="center">
        <Typography variant="body1" textAlign="center">
          Error in retrieving comments.
        </Typography>
      </Stack>
    );
  }
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
        <Stack
          px={8}
          justifyContent="space-between"
          direction="row"
          width="100%"
        >
          {nextUrl && <Button onClick={getAllHandler}> View all</Button>}
          {pageSize > 3 && <Button onClick={clearHandler}> View less </Button>}
        </Stack>
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
  const { full_text: fullText, id, references } = postData;
  const [commentOpen, setCommentOpen] = useState(false);
  const inputCommentHanlder = () => {
    setCommentOpen(!commentOpen);
  };
  return (
    <>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item className="post" xs={12}>
        <Typography variant="body1"> {fullText}</Typography>
      </Grid>
      <Grid item className="references" xs={12}>
        <List>
          <Typography variant="body1" sx={{ textDecoration: "underline" }}>
            References
          </Typography>

          {references.length > 0 ? (
            references.map((reference) => (
              <ListItem key={reference.id} disablePadding>
                <ListItemText
                  primary={reference.citation}
                  primaryTypographyProps={{ variant: "subtitle2" }}
                />
              </ListItem>
            ))
          ) : (
            <Typography>None</Typography>
          )}
        </List>
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
        <Grid item xs={12}>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="flex-end"
          >
            <Button
              variant="outlined"
              size="small"
              onClick={inputCommentHanlder}
              sx={{ justifyContent: "flex-end", height: "fit-content" }}
            >
              Comment
            </Button>
            <PostMetaData postData={postData} />
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {commentOpen && (
        <Grid item xs={12}>
          <CommentForm id={id} />
        </Grid>
      )}
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
  const { id: openProblemId } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    message: "",
  });
  const onSubmitHandler = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    let apiCall;
    if (type === "solution") {
      apiCall = apiPosts.solutionsSubmit;
    } else if (type === "discussion") {
      apiCall = apiPosts.discussionsSubmit;
    }
    setSubmitting(true);
    try {
      const referenceData = values.references.map(
        (reference) => reference.data
      );
      const updatedValues = {
        ...values,
        references: referenceData,
        open_problem: openProblemId,
      }; // Set the open_problem parameter.
      const response = await apiCall({
        openProblemId,
        data: updatedValues,
      });
      if (response.status === 201) {
        setDialogOpen(true);
        setDialogContent({
          title: "Success",
          message: `Your ${type} has been posted and is under review`,
        });
        resetForm();
      }
    } catch (error) {
      setErrors({ submit: error.message });
      setDialogContent({ title: "Unsuccessful", message: error.message });
    }
    setSubmitting(false);
  };
  const titleString = type === "discussion" ? "Your thoughts" : "Your solution";
  return (
    <PostFormManager onSubmitHandler={onSubmitHandler}>
      <Stack padding={2} spacing={2} direction="column" width="100%">
        <FormManagedTextField
          name="full_text"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          required
          label={titleString}
        />
        <FormManagedTextField label="Comment as:" name="alias" />
        <Stack direction="column">
          <PostReferenceSection />
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center" paddingY={2}>
          <Button variant="contained" type="submit" size="large">
            Submit
          </Button>
        </Stack>
      </Stack>
      <SubmissionDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        title={dialogContent.title}
        message={dialogContent.message}
      />
    </PostFormManager>
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
      let apiCall;
      if (sectionType === "solution") {
        apiCall = apiPosts.solutionsForOpenProblem;
      }
      if (sectionType === "discussion") {
        apiCall = apiPosts.discussionsForOpenProblem;
      }
      const response = await apiCall({
        openProblemId: id,
        params: { p: pagination, page_size: 6 },
      });
      if (response.data) {
        const { data } = response;
        setCount(data.count);
        setPosts(data.results);
      }
    }
    getData();
  }, [pagination, sectionType, id]);

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
          <Pagination
            size="small"
            count={pageNumbers}
            onChange={(event, value) => setPagination(value)}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <PostForm type={sectionType} />
      </Grid>
    </Grid>
  );
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
          <PostSection sectionType="solution" sectionDescription="" />
        </TabPanel>
        <TabPanel value="discussion">
          <PostSection
            sectionType="discussion"
            sectionDescription={solutionDescription.mainText}
          />
        </TabPanel>
      </TabContext>
    </Paper>
  );
}
