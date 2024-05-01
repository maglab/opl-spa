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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import apiPosts from "../../api/apiPosts";
import {
  getAll as getAllComments,
  post as postComment,
} from "../../apiNew/apiComments";
import discussionDescription from "../../assets/descriptions/discussion.json";
import solutionDescription from "../../assets/descriptions/solution.json";
import SECTION_KEYS from "../../constants/problemDetailsSectionKeys";
import { PostContext, PostProvider } from "../../contexts/postCommentContext";
import newRandomId from "../../utilities/randomId";
import {
  formatFullName,
  setDate,
} from "../../utils/functions/dataManipulation";
import FormManagedTextField from "../common/formManagedTextField";
import ReferenceItem from "../submit/referenceItem";
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
  const { postType } = useContext(PostContext);

  const onSubmitHandler = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    setSubmitting(true);
    try {
      const updatedValues = { ...values, post: id };
      const response = await postComment({
        id,
        postType: `${postType}`,
        postRequestData: updatedValues,
      });

      if (response.status === 201) {
        // addComment(response.data);
        setDialogOpen(true);
        setDialogContent({
          title: "Comment submitted",
          message: "Your comment has been submitted and is under review.",
        });
        resetForm();
      }
    } catch (error) {
      setDialogOpen(true);
      setErrors({ submit: error.message });
      setDialogContent({ title: "Unsuccessful", message: error.message });
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
function CommentSection({ id, commentsData, setCommentsData }) {
  const { postType } = useContext(PostContext);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllComments({
          id,
          postType,
          params: { page_size: pageSize },
        });

        if (response.data) {
          const { data } = response;
          setCommentsData({
            comments: data.results,
            count: data.count,
            nextUrl: data.next,
            error: false,
          });
        }
      } catch (error) {
        setCommentsData((prevCommentsData) => ({
          ...prevCommentsData,
          error: true,
        }));
      }
    }

    fetchData();
  }, [id, pageSize, postType, setCommentsData]);

  const handleGetAll = () => {
    if (commentsData.nextUrl) {
      setPageSize(commentsData.count);
    }
  };

  const handleClear = () => {
    setPageSize(3);
  };

  return (
    <Stack>
      {commentsData.error ? (
        <Stack width="100%" justifyContent="center" p={2}>
          <Typography variant="body1" textAlign="center" color="error">
            Error in retrieving comments.
          </Typography>
        </Stack>
      ) : (
        <Stack alignItems="flex-start" width="100%">
          <Stack pl={4} width="100%" alignItems="center">
            <List sx={{ width: "100%" }}>
              {commentsData.comments.map((comment) => (
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
            {commentsData.nextUrl && (
              <Button onClick={handleGetAll}>View all</Button>
            )}
            {pageSize > 3 && <Button onClick={handleClear}>View less</Button>}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

function PostMetaData({ postData }) {
  const {
    created_at: date,
    first_name: firstName,
    last_name: lastName,
  } = postData;
  const dateString = date ? setDate(date) : null;
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
  const [commentsData, setCommentsData] = useState({
    comments: [],
    count: 0,
    nextUrl: null,
    error: false,
  });
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
          <CommentForm id={id} setCommentsData={setCommentsData} />
        </Grid>
      )}
      <Grid item xs={12}>
        <CommentSection
          id={id}
          commentsData={commentsData}
          setCommentsData={setCommentsData}
        />
      </Grid>
    </>
  );
}

function Post({ postData }) {
  const { postType } = useContext(PostContext);
  if (postType === SECTION_KEYS.discussion) {
    return (
      <Grid container spacing={2}>
        <PostContent postData={postData} />
      </Grid>
    );
  }
  return (
    <Grid item container direction="row" alignItems="flex-start" spacing={2}>
      {/* <Grid item xs={1}>
        <Stack justifyContent="center" alignItems="center">
          <IconButton size="large" color="primary">
            <ArrowCircleUpIcon />
          </IconButton>
          <Typography>0</Typography>
          <IconButton size="large" color="primary">
            <ArrowCircleDownIcon />
          </IconButton>
        </Stack>
      </Grid> */}
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
  const { postType } = useContext(PostContext);
  const onSubmitHandler = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    let apiCall;
    if (postType === SECTION_KEYS.solutions) {
      apiCall = apiPosts.solutionsSubmit;
    } else if (postType === SECTION_KEYS.discussion) {
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
  const titleString =
    type === SECTION_KEYS.discussion ? "Your thoughts" : "Your solution";
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

function PostSection({ sectionType, sectionDescription }) {
  const { id } = useParams();
  const [pagination, setPagination] = useState(1);
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const pageNumbers = useMemo(() => calculatePagination(count, 6), [count]);

  useEffect(() => {
    async function getData() {
      let apiCall;
      if (sectionType === SECTION_KEYS.solutions) {
        apiCall = apiPosts.solutionsForOpenProblem;
      }
      if (sectionType === SECTION_KEYS.discussion) {
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
    <PostProvider sectionType={sectionType}>
      <Grid container spacing={2} padding={2} direction="column" width="100%">
        <Grid item xs={12}>
          <Typography variant="h5" textAlign="center">
            {sectionType === SECTION_KEYS.discussion
              ? "Discussion"
              : "Solutions"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            {sectionDescription}
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          {posts && posts.length > 0 ? (
            posts.map((post) => <Post postData={post} key={post.id} />)
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
    </PostProvider>
  );
}

export default function DiscussionSolution({ addScroller }) {
  const [tabValue, setTabValue] = useState(SECTION_KEYS.solutions);
  return (
    <Paper
      ref={(el) => {
        addScroller(SECTION_KEYS.solutions, el, () =>
          setTabValue(SECTION_KEYS.solutions)
        );
        addScroller(SECTION_KEYS.discussion, el, () =>
          setTabValue(SECTION_KEYS.discussion)
        );
      }}
    >
      <TabContext value={tabValue}>
        <Stack width="100%" justifyContent="center" alignItems="center">
          <TabList onChange={(event, value) => setTabValue(value)}>
            <Tab value={SECTION_KEYS.solutions} label="SOLUTIONS" />
            <Tab value={SECTION_KEYS.discussion} label="DISCUSSIONS" />
          </TabList>
        </Stack>

        <TabPanel value={SECTION_KEYS.solutions} id={SECTION_KEYS.solutions}>
          <PostSection
            sectionType={SECTION_KEYS.solutions}
            sectionDescription={solutionDescription.mainText}
          />
        </TabPanel>
        <TabPanel value={SECTION_KEYS.discussion}>
          <PostSection
            sectionType={SECTION_KEYS.discussion}
            sectionDescription={discussionDescription.mainText}
          />
        </TabPanel>
      </TabContext>
    </Paper>
  );
}
