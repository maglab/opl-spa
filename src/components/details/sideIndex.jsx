import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, Paper } from "@mui/material";
import { capitalize } from "lodash";
import React, { useState } from "react";
import SECTION_KEYS from "../../constants/problemDetailsSectionKeys";
import IndexItem from "./indexItem";

export default function SideIndex({ problem, scroller }) {
  const [openAnnotations, setOpenAnnotations] = useState(true);
  const [openRelatedProblems, setOpenRelatedProblems] = useState(true);

  return (
    <Paper>
      <List>
        <IndexItem
          label="Problem"
          onClick={() => scroller(SECTION_KEYS.problem)}
        />
        {problem.references?.length ? (
          <IndexItem
            label="References"
            onClick={() => scroller(SECTION_KEYS.references)}
          />
        ) : undefined}
        {Object.values(problem.annotations).some(
          (i) => Array.isArray(i) && i.length
        ) && (
          <>
            <IndexItem
              label="Annotations"
              decorator={openAnnotations ? <ExpandLess /> : <ExpandMore />}
              onClick={() => setOpenAnnotations(!openAnnotations)}
            />
            <Collapse in={openAnnotations} unmountOnExit>
              <List disablePadding>
                {Object.entries(problem.annotations)
                  .filter(([, values]) => values.length)
                  .map(([type, values]) => (
                    <IndexItem
                      key={type}
                      label={capitalize(type)}
                      badgeLabel={values.length}
                      pl={2}
                      onClick={() => scroller(type)}
                    />
                  ))}
              </List>
            </Collapse>
          </>
        )}

        <>
          <IndexItem
            label="Related Problems"
            decorator={openRelatedProblems ? <ExpandLess /> : <ExpandMore />}
            onClick={() => setOpenRelatedProblems(!openRelatedProblems)}
          />
          <Collapse in={openRelatedProblems} unmountOnExit>
            <List disablePadding>
              {problem.upstream.length ? (
                <IndexItem
                  label="Upstream"
                  badgeLabel={problem.upstream.length}
                  pl={2}
                  onClick={() => scroller(SECTION_KEYS.upstreamProblems)}
                />
              ) : undefined}
              {problem.downstream.length ? (
                <IndexItem
                  label="Downstream"
                  badgeLabel={problem.downstream.length}
                  pl={2}
                  onClick={() => scroller(SECTION_KEYS.downstreamProblems)}
                />
              ) : undefined}
            </List>
          </Collapse>
        </>
        <IndexItem
          label="Solutions"
          onClick={() => scroller(SECTION_KEYS.solutions)}
        />
        <IndexItem
          label="Discussion"
          onClick={() => scroller(SECTION_KEYS.discussion)}
        />
      </List>
    </Paper>
  );
}
