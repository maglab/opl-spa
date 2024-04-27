import FlagIcon from "@mui/icons-material/Flag";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import QueryParamsContext from "../../contexts/queryParamsContext";
import StateContext from "../../contexts/stateContext";
import useQueryParams from "../../hooks/useQueryParams";
import { useGetProblems } from "../../queries/problems";
import { problemsQueryScheme } from "../../routes/querySchemes";
import Center from "../common/center";
import ProblemTag from "../common/problemTag";
import formatEntries from "./queryFormat";
import ReportForm from "./report";

function OpenProblemCard({ openProblem, contact, setReportOpen }) {
  const {
    title,
    description,
    problem_id: id,
    tags,
    solution_count: solutionCount,
    discussion_count: discussionCount,
  } = openProblem ?? "";
  const { first_name: firstName, last_name: lastName } = contact ?? "";
  const postCounts = solutionCount + discussionCount;

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Grid container direction="column" spacing={2} padding={4}>
          <Grid item>
            <Typography variant="subtitle2">
              Posted by: {firstName} {lastName}
            </Typography>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to={`./${id}`} underline="hover">
              <Typography variant="h6">{title}</Typography>
            </Link>
          </Grid>
          <Grid item maxHeight={250} overflow="hidden">
            <Typography
              variant="body1"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item xs={12} py={2}>
            <Stack direction="row" spacing={2}>
              {tags &&
                tags.map((tag) => (
                  <ProblemTag key={tag.id} label={tag.title} />
                ))}
            </Stack>
          </Grid>
          <Grid item container justifyContent="center" xs={12}>
            <ButtonGroup>
              <Button
                size="small"
                startIcon={<ModeCommentIcon />}
                color="primary"
                component={RouterLink}
                to={`./${id}`}
              >
                {postCounts} Posts
              </Button>
              <Button
                startIcon={<FlagIcon />}
                color="error"
                onClick={() => setReportOpen(true)}
              >
                Report
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function ListItemComponent({ id, title }) {
  return (
    <Paper>
      <ListItem>
        <Link component={RouterLink} to={`./${id}`} underline="hover">
          <ListItemText primary={title} />
        </Link>
      </ListItem>
    </Paper>
  );
}

function calculatePagination(count, view) {
  const dividedBy = view === "card" ? 10 : 20;
  return Math.ceil(count / dividedBy);
}

function OpenProblemList() {
  const { editQueryParams } = useContext(QueryParamsContext);
  const { queryParams } = useQueryParams(problemsQueryScheme);
  const { pageNum, sorting, view } = useContext(StateContext);

  const query = useMemo(() => {
    if (queryParams.search) {
      return formatEntries(queryParams.search);
    }
    return {};
  }, [queryParams]);
  const getProblemsState = useGetProblems({
    query,
    pageNum,
    pageSize: view === "list" ? 20 : 10,
    sorting,
  });
  const [reportOpen, setReportOpen] = useState(false);

  const handlePageChange = (_, newPage) => {
    editQueryParams((draft) => {
      draft.pageNum = newPage;
    });
  };

  if (view === "card") {
    return (
      <Stack spacing={2} py={4} alignItems="center">
        <Pagination
          page={pageNum}
          count={
            getProblemsState.isSuccess
              ? calculatePagination(getProblemsState.data.data.count, view)
              : 0
          }
          onChange={handlePageChange}
          size="large"
        />
        {getProblemsState.isPending ? (
          <Center>
            <CircularProgress />
          </Center>
        ) : (
          getProblemsState.data?.data.results.map((openProblem) => (
            <OpenProblemCard
              key={openProblem.problem_id}
              openProblem={openProblem}
              contact={openProblem.contact}
              setReportOpen={setReportOpen}
            />
          ))
        )}
        <ReportForm open={reportOpen} setOpen={setReportOpen} />
        <Pagination
          page={pageNum}
          count={
            getProblemsState.isSuccess
              ? calculatePagination(getProblemsState.data.data.count, view)
              : 0
          }
          onChange={handlePageChange}
          size="large"
        />
      </Stack>
    );
  }
  return (
    <Stack alignItems="center" spacing={2} py={4}>
      <List disablePadding sx={{ width: "100%" }}>
        <Stack spacing={2}>
          {getProblemsState.isPending ? (
            <Center>
              <CircularProgress />
            </Center>
          ) : (
            getProblemsState.data.data.results.map((openProblem) => (
              <ListItemComponent
                key={openProblem.id}
                title={openProblem.title}
                id={openProblem.id}
              />
            ))
          )}
        </Stack>
      </List>
      <Pagination
        page={pageNum}
        count={10}
        onChange={handlePageChange}
        size="large"
      />
    </Stack>
  );
}

export default OpenProblemList;
