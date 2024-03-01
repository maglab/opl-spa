import EditIcon from "@mui/icons-material/Edit";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
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
import React, { useContext, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

import apiAnnotations from "../../api/apiAnnotations";
import { OpenProblemsContext } from "../../context/context";
import extractAnnotationInformation from "../../utils/functions/extractAnnotationInformation";
import useGetApi from "../../utils/hooks/useApi";

function OpenProblemCard({ openProblem, contact }) {
  const { title, description, problem_id: id } = openProblem ?? "";
  const { first_name: firstName, last_name: lastName } = contact ?? "";
  const { apiData, error } = useGetApi(
    apiAnnotations.getAnnotationsForProblem,
    {
      all: true,
      problemId: id,
      fields: ["compound", "subject", "gene", "species"],
    }
  );
  const annotations = useMemo(() => {
    // The api returns a nested structure of all annotations relating to an open problem we need to flatten it first so its easy to display
    if (apiData && !error) {
      const flattenedAnnotations = Object.entries(apiData).flatMap(
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
  }, [id, apiData]);

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Grid container direction="column" spacing={2} padding={4}>
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
          <Grid item sx={12} py={2}>
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

          <Grid item>
            <Typography variant="subtitle2">
              Posted by: {firstName} {lastName}
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" xs={12}>
            <ButtonGroup>
              <Button
                size="small"
                startIcon={<ModeCommentIcon />}
                color="primary"
              >
                0 Posts
              </Button>
              <Button startIcon={<VisibilityIcon />}>Follow</Button>
              <Button startIcon={<EditIcon />}> Edit</Button>
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
function OpenProblemList({ openProblems }) {
  const { state, dispatch } = useContext(OpenProblemsContext);
  const { view } = state;

  const handlePageChange = (event, newPage) => {
    // Dispatch an action to update the page
    dispatch({ type: "setPage", payload: { page: newPage } });
  };

  const paginationCount = useMemo(
    () => calculatePagination(state.count, state.view),
    [state.count, state.view]
  );

  if (view === "card") {
    return (
      <Stack spacing={2} py={4} alignItems="center">
        {openProblems &&
          openProblems.map((openProblem) => (
            <OpenProblemCard
              key={openProblem.id}
              openProblem={openProblem}
              contact={openProblem.contact}
            />
          ))}
        <Pagination
          count={paginationCount}
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
          {openProblems &&
            openProblems.map((openProblem) => (
              <ListItemComponent
                key={openProblem.id}
                title={openProblem.title}
                id={openProblem.id}
              />
            ))}
        </Stack>
      </List>
      <Pagination count={10} onChange={handlePageChange} size="large" />
    </Stack>
  );
}

export default OpenProblemList;
