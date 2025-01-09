import MessageIcon from "@mui/icons-material/Message";
import {
  Badge,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { original as ori } from "immer";
import React, { useContext, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import OPEN_PROBLEM_KEYS from "../../constants/problemDataKeys";
import SECTION_KEYS from "../../constants/problemDetailsSectionKeys";
import SEARCH_SUBJECT_KEYS from "../../constants/problemQuerySubjectKeys";
import QueryParamsContext from "../../contexts/queryParamsContext";
import StateContext from "../../contexts/stateContext";
import { useGetProblems } from "../../queries/problems";
import Center from "../common/center";
import ProblemTag from "../common/problemTag";
import StandardGrid from "../common/standardGrid";
import StandardStack from "../common/standardStack";
import { UserInformation } from "../details/postMetaData";
import formatEntries, { objectToQueryParam } from "./queryFormat";
import ReportForm from "./report";

function ProblemCard({
  title,
  description,
  id,
  tags,
  contact,
  discussionCount,
  solutionCount,
  onTagClick,
}) {
  return (
    <Paper sx={{ width: "100%" }}>
      <StandardGrid minor p direction="column">
        <Grid item xs={12}>
          <StandardStack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link component={RouterLink} to={`./${id}`} underline="hover">
              <Typography variant="h6">{title}</Typography>
            </Link>
            <Link
              component={RouterLink}
              to={`./${id}#${SECTION_KEYS.solutions}`}
            >
              <IconButton size="small" com>
                <Badge
                  badgeContent={solutionCount + discussionCount}
                  color="primary"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <MessageIcon />
                </Badge>
              </IconButton>
            </Link>
          </StandardStack>
        </Grid>
        <Grid
          item
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description && description}
        </Grid>
        <Grid item container xs={12}>
          <StandardStack
            direction="row"
            justifyContent="space-between"
            width="100%"
          >
            <Grid item container direction="row" spacing={0.5}>
              {tags
                ? tags.map((tag) => (
                    <Grid item key={tag.id} xs="auto">
                      <ProblemTag
                        label={tag.title}
                        onClick={() => onTagClick(tag.title)}
                      />
                    </Grid>
                  ))
                : undefined}
            </Grid>
            <Grid item>
              <UserInformation contact={contact} />
            </Grid>
          </StandardStack>
        </Grid>
      </StandardGrid>
    </Paper>
  );
}

function calculatePagination(count, view) {
  const dividedBy = view === "card" ? 10 : 20;
  return Math.ceil(count / dividedBy);
}

function OpenProblemList() {
  const { queryParams, editQueryParams } = useContext(QueryParamsContext);
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

  const handleTagClick = (tagTitle) => {
    const newCriteria = { subject: SEARCH_SUBJECT_KEYS.tag, text: tagTitle };
    editQueryParams((draft) => {
      const original = ori(draft);
      const param = objectToQueryParam(newCriteria);
      if (!Array.isArray(original.search)) {
        draft.search = [param];
      } else if (!original.search.includes(param)) {
        draft.search.push(param);
      }
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
          getProblemsState.data.data.results.map((openProblem) => (
            <ProblemCard
              key={openProblem[OPEN_PROBLEM_KEYS.id]}
              title={openProblem[OPEN_PROBLEM_KEYS.title]}
              id={openProblem[OPEN_PROBLEM_KEYS.id]}
              tags={openProblem[OPEN_PROBLEM_KEYS.categories]}
              description={openProblem[OPEN_PROBLEM_KEYS.description]}
              solutionCount={openProblem[OPEN_PROBLEM_KEYS.solutionCount]}
              discussionCount={openProblem[OPEN_PROBLEM_KEYS.discussionCount]}
              contact={openProblem[OPEN_PROBLEM_KEYS.contact]}
              onTagClick={handleTagClick}
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
}

export default OpenProblemList;
