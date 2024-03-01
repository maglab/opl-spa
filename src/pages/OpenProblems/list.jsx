import {
  List,
  ListItem,
  ListItemText,
  Pagination,
  Paper,
  Stack,
} from "@mui/material";
import React, { useContext, useMemo } from "react";

import { OpenProblemsContext } from "../../context/context";
import OpenProblemCard from "./card";

function ListItemComponent({ title }) {
  return (
    <Paper>
      <ListItem>
        <ListItemText primary={title} disablePadding />
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
              />
            ))}
        </Stack>
      </List>
      <Pagination count={10} onChange={handlePageChange} size="large" />
    </Stack>
  );
}

export default OpenProblemList;
