import React, { useContext, useState, useEffect } from "react";
import { Stack } from "@mui/material";

import { OpenProblemsContext } from "../../context/context";
import OpenProblemList from "./list";
import Header from "./header";
import apiProblems from "../../api/apiProblems";

function OpenProblems() {
  const { state, dispatch } = useContext(OpenProblemsContext);
  const { query, page, sorting, view } = state;
  const [loading, setLoading] = useState(true);
  const [apiError, setError] = useState("");
  const [openProblems, setOpenProblems] = useState([]);
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
        dispatch({ type: "" });
      } catch (error) {
        setError(apiError);
      }
      setLoading(false);
    }
    fetchData();
  }, [query, page, sorting, view]);

  return (
    <Stack>
      <Header />
      <OpenProblemList openProblems={openProblems} loading={loading} />
    </Stack>
  );
}

export default OpenProblems;
