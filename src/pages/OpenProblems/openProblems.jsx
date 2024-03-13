import { CircularProgress, Grid, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import apiProblems from "../../api/apiProblems";
import { OpenProblemsContext } from "../../context/context";
import Header from "./header";
import OpenProblemList from "./list";

// No loading rendering as of yet
function OpenProblems() {
  const { state, dispatch } = useContext(OpenProblemsContext);
  const { query, page, sorting, view } = state;
  const [loading, setLoading] = useState(true);
  const [apiError, setError] = useState("");
  const [openProblems, setOpenProblems] = useState([]);
  // Fetch data using context to retrieve query params
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await apiProblems.getProblems({
          queryParams: {
            p: page,
            sorting,
            search: query,
            page_size: view === "list" ? 20 : 10,
          },
        });
        setOpenProblems(data.results && data.results);
        dispatch({ type: "setCount", payload: { count: data.count } });
      } catch (error) {
        setError(apiError);
      }
      setLoading(false);
    }
    fetchData();
  }, [query, page, sorting, view]);

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <Stack
            direction="row"
            justifyContent="center"
            height="70vh"
            alignItems="center"
          >
            <CircularProgress />
          </Stack>
        ) : (
          <OpenProblemList openProblems={openProblems} loading={loading} />
        )}
      </Grid>
    </Grid>
  );
}

export default OpenProblems;
