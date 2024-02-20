import React, { useContext } from "react";
import {
  ListItem,
  ListItemText,
  Paper,
  List,
  Pagination,
  Stack,
  Skeleton,
} from "@mui/material";

import OpenProblemCard from "./card";
import { OpenProblemsContext } from "../../context/context";

function ListItemComponent({ title }) {
  return (
    <Paper>
      <ListItem>
        <ListItemText primary={title} />
      </ListItem>
    </Paper>
  );
}

function LoadingSkeletonCard() {
  return (
    <Skeleton width="100%">
      <OpenProblemCard />
    </Skeleton>
  );
}

function OpenProblemList({ openProblems, loading }) {
  const { state, dispatch } = useContext(OpenProblemsContext);
  const { view } = state;

  const handlePageChange = (event, newPage) => {
    // Dispatch an action to update the page
    dispatch({ type: "setPage", payload: { page: newPage } });
  };

  if (view === "card") {
    return (
      <>
        {loading && <LoadingSkeletonCard />}
        <Stack spacing={2} py={4} alignItems="center">
          {openProblems &&
            openProblems.map((openProblem) => (
              <OpenProblemCard key={openProblem.id} openProblem={openProblem} />
            ))}
          <Pagination count={10} onChange={handlePageChange} size="large" />
        </Stack>
      </>
    );
  }
  return (
    <Stack alignItems="center" spacing={2} py={4}>
      <List>
        <Stack spacing={2}>
          {openProblems &&
            openProblems.map((openProblem) => (
              <ListItemComponent
                key={openProblem.id}
                title={openProblem.title}
              />
            ))}
        </Stack>
      </List>
    </Stack>
  );
}

export default OpenProblemList;
