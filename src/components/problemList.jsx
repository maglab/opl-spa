import { Grid } from "@mui/material";
import React from "react";
import { DefaultMargin } from "./defaultMargin";
import SearchCriteriaChip from "./searchCriteriaChip";

export default function ProblemList() {
  return (
    <DefaultMargin>
      <Grid container>
        <Grid item>
          <SearchCriteriaChip
            subject="Gene"
            subjectColor="primary"
            queryText="Query Text here"
          />
        </Grid>
      </Grid>
    </DefaultMargin>
  );
}
