import { Grid, Typography } from "@mui/material";
import React from "react";
import SECTION_KEYS from "../../constants/problemDetailsSectionKeys";
import ProblemTag from "../common/problemTag";
import Referenceable from "../common/referenceable";
import StandardCard from "../common/standardCard";
import StandardGrid from "../common/standardGrid";
import StandardStack from "../common/standardStack";

export default function Description({ data, addScroller }) {
  const { title, description, tags } = data;
  // Subject will be tags:

  return (
    <Referenceable ref={(el) => addScroller(SECTION_KEYS.problem, el)}>
      <StandardCard header="Problem">
        <StandardStack minor>
          <Typography variant="h5">{title}</Typography>
          {description ? (
            <Typography variant="body2">{description}</Typography>
          ) : undefined}
          {tags && tags.length ? (
            <StandardGrid minor direction="row">
              {tags
                ? tags.map((tag) => (
                    <Grid item key={tag.id} xs="auto">
                      <ProblemTag label={tag.title} />
                    </Grid>
                  ))
                : undefined}
            </StandardGrid>
          ) : undefined}
        </StandardStack>
      </StandardCard>
    </Referenceable>
  );
}
