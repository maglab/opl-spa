import { Link, List, ListItem, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useField } from "formik";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDebounce } from "react-use";
import apiProblems from "../../api/apiProblems";

export default function DuplicatedReminder() {
  const [similarProblems, setSimilarProblems] = useState([]);
  const [field] = useField("title");

  async function searchProblems(searchQuery) {
    if (!searchQuery) {
      setSimilarProblems([]);
    } else {
      const queryParams = { search: searchQuery };
      const response = await apiProblems.getProblems({ queryParams });
      setSimilarProblems(response.data.results);
    }
  }

  useDebounce(
    () => {
      searchProblems(field.value);
    },
    [field],
    500
  );

  return (
    <Stack
      sx={{ display: { xs: similarProblems.length ? "block" : "none" } }}
      spacing={2}
    >
      <Typography variant="h7" color="warning.main">
        Your problem might have been submitted previously, the following are
        titles of problems similar to yours.
      </Typography>
      <List disablePadding>
        {similarProblems.slice(0, 5).map((openProblem) => (
          <ListItem key={openProblem.problem_id}>
            <Link
              component={RouterLink}
              to={`open-problems/${openProblem.problem_id}`}
            >
              {openProblem.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
