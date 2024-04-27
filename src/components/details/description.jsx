import { Grid, Typography } from "@mui/material";
import React from "react";
import SECTION_KEYS from "../../constants/problemDetailsSectionKeys";
import ProblemTag from "../common/problemTag";
import Referenceable from "../common/referenceable";
import StandardGrid from "../common/standardGrid";
import StandardSection from "../common/standardSection";
import StandardStack from "../common/standardStack";

export default function Description({ data, addScroller }) {
  const { title, description, tags } = data;

  return (
    <Referenceable ref={(el) => addScroller(SECTION_KEYS.problem, el)}>
      <StandardSection header="Problem">
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
      </StandardSection>
    </Referenceable>
  );
}
