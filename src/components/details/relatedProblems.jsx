import { Divider, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import SECTION_KEYS from "../../constants/problemDetailsSectionKeys";
import NumberedList from "../common/numberedList";
import Referenceable from "../common/referenceable";
import StandardSection from "../common/standardSection";
import StandardStack from "../common/standardStack";

export default function RelatedProblems({
  upstream = [],
  downstream = [],
  addScroller,
}) {
  return (
    <StandardSection header="Related Problems">
      <StandardStack minor divider={<Divider />}>
        {upstream.length ? (
          <Referenceable
            ref={(el) => {
              addScroller(SECTION_KEYS.upstreamProblems, el);
            }}
          >
            <NumberedList
              header="Upstream"
              items={upstream.map((problem) => ({
                key: problem.problem_id,
                item: (
                  <Typography variant="subtitle1">{problem.title}</Typography>
                ),
                component: RouterLink,
                to: `/open-problems/${problem.problem_id}`,
              }))}
            />
          </Referenceable>
        ) : undefined}
        {downstream.length ? (
          <Referenceable
            ref={(el) => {
              addScroller(SECTION_KEYS.downstreamProblems, el);
            }}
          >
            <NumberedList
              header="Downstream"
              items={downstream.map((problem) => ({
                key: problem.problem_id,
                item: (
                  <Typography variant="subtitle1">{problem.title}</Typography>
                ),
                component: RouterLink,
                to: `/open-problems/${problem.problem_id}`,
              }))}
            />
          </Referenceable>
        ) : undefined}
      </StandardStack>
    </StandardSection>
  );
}
