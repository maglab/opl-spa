import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button, Grid, Paper } from "@mui/material";
import React, { useRef } from "react";

import { useLoaderData, useParams } from "react-router-dom";
import ClassificationTable from "./classificationTable";
import DiscussionSolution from "./discussionSolution";
import Header from "./header";
import RelatedProblemsList from "./relatedProblems";
import TopBar from "./topBar";

export default function Details() {
  const { data } = useLoaderData();
  const { id } = useParams();
  const { parent_problem: upstream, children: downstream } = data;

  // For smooth scrolling in top bar buttons
  const detailsRef = useRef(null);
  const solutionsRef = useRef(null);
  const relatedProblemsRef = useRef(null);
  const topBarRef = useRef(null);

  const scrollUpClickHander = () => {
    if (topBarRef.current) {
      topBarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item xs={12} display={{ md: "none" }} ref={topBarRef} width="100%">
        <TopBar refs={{ detailsRef, solutionsRef, relatedProblemsRef }} />
      </Grid>
      <Grid container item spacing={2} xs={12}>
        <Grid item md={3} xs={12}>
          <ClassificationTable id={id} />
        </Grid>
        <Grid container item md={9} direction="column" spacing={4}>
          <Grid item ref={detailsRef}>
            <Paper>
              <Header data={data} />
            </Paper>
          </Grid>
          <Grid item ref={solutionsRef}>
            <DiscussionSolution />
          </Grid>
          <Grid item ref={relatedProblemsRef}>
            <RelatedProblemsList upstream={upstream} downstream={downstream} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ display: { md: "none" } }}>
        <Button
          color="primary"
          size="large"
          startIcon={<ArrowUpwardIcon />}
          onClick={scrollUpClickHander}
        >
          Back to top
        </Button>
      </Grid>
    </Grid>
  );
}
