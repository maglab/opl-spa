import FlagIcon from "@mui/icons-material/Flag";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
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

import Center from "../../components/common/center";
import QueryParamsContext from "../../contexts/queryParamsContext";
import StateContext from "../../contexts/stateContext";
import {
  useGetProblemAllAnnotations,
  useGetProblems,
} from "../../queries/problems";
import extractAnnotationInformation from "../../utils/functions/extractAnnotationInformation";
import ReportForm from "./report";

function OpenProblemCard({ openProblem, contact, setReportOpen }) {
  const { title, description, problem_id: id } = openProblem ?? "";
  const { first_name: firstName, last_name: lastName } = contact ?? "";
  const getProblemAllAnnotationsState = useGetProblemAllAnnotations(id, [
    "compound",
    "subject",
    "gene",
    "species",
  ]);
  const annotations = useMemo(() => {
    // The api returns a nested structure of all annotations relating to an open problem we need to flatten it first so its easy to display
    if (getProblemAllAnnotationsState.isSuccess) {
      const { data } = getProblemAllAnnotationsState.data;
      const flattenedAnnotations = Object.entries(data).flatMap(
        ([key, values]) => values.map((value) => ({ [key]: value[key] }))
      );
      if (flattenedAnnotations.length === 0) return [];

      const formattedAnnotations = flattenedAnnotations.map((annotation) => {
        const category = Object.keys(annotation)[0];
        const annotationObject = Object.values(annotation)[0];
        return extractAnnotationInformation(annotationObject, category);
      });

      return formattedAnnotations;
    }
    return [];
  }, [getProblemAllAnnotationsState]);

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
              {annotations &&
                annotations.map((annotation) => (
                  <Chip
                    label={annotation.title}
                    variant="outlined"
                    color="primary"
                  />
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
                0 Posts
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
  const { pageNum, sorting, view } = useContext(StateContext);

  const getProblemsState = useGetProblems({
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
          getProblemsState.data.data.results.map((openProblem) => (
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
