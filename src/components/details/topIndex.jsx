import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Grid, Menu, Paper, Stack } from "@mui/material";
import { capitalize } from "lodash";
import React, { useMemo, useRef, useState } from "react";
import SECTION_KEYS from "../../constants/problemDetailsSectionKeys";
import StandardGrid from "../common/standardGrid";
import IndexItem from "./indexItem";

export default function TopIndex({ problem, scroller }) {
  const [openAnnotationsMenu, setOpenAnnotationsMenu] = useState(false);
  const [openRelatedProblemsMenu, setOpenRelatedProblemsMenu] = useState(false);
  const elementRefs = useRef({});

  const shouldShowRelatedProblems = useMemo(
    () => problem.upstream.length || problem.downstream.length,
    [problem]
  );
  const shouldShowAnnotations = useMemo(
    () =>
      Object.values(problem.annotations).some(
        (i) => Array.isArray(i) && i.length
      ),
    [problem]
  );

  return (
    <Paper>
      <StandardGrid direction="row">
        <Grid item xs="auto">
          <IndexItem
            label="Problem"
            onClick={() => scroller(SECTION_KEYS.problem)}
          />
        </Grid>
        {problem.references?.length ? (
          <Grid item xs="auto">
            <IndexItem
              label="References"
              onClick={() => scroller(SECTION_KEYS.references)}
            />
          </Grid>
        ) : undefined}
        {shouldShowAnnotations ? (
          <Grid item xs="auto">
            <IndexItem
              ref={(el) => {
                elementRefs.current.annotations = el;
              }}
              label="Annotations"
              badgeLabel={Object.values(problem.annotations).reduce(
                (acc, a) => acc + a.length,
                0
              )}
              decorator={openAnnotationsMenu ? <ExpandLess /> : <ExpandMore />}
              onClick={() => {
                setOpenAnnotationsMenu(!openAnnotationsMenu);
                setOpenRelatedProblemsMenu(false);
              }}
            />
          </Grid>
        ) : undefined}
        {shouldShowRelatedProblems ? (
          <Grid item xs="auto">
            <IndexItem
              ref={(el) => {
                elementRefs.current.relatedProblems = el;
              }}
              label="Related Problems"
              badgeLabel={problem.upstream.length + problem.downstream.length}
              decorator={
                openRelatedProblemsMenu ? <ExpandLess /> : <ExpandMore />
              }
              onClick={() => {
                setOpenRelatedProblemsMenu(!openRelatedProblemsMenu);
                setOpenAnnotationsMenu(false);
              }}
            />
          </Grid>
        ) : undefined}
        <Grid item xs="auto">
          <IndexItem
            label="Solutions"
            onClick={() => scroller(SECTION_KEYS.solutions)}
          />
        </Grid>
        <Grid item xs="auto">
          <IndexItem
            label="Discussion"
            onClick={() => scroller(SECTION_KEYS.discussion)}
          />
        </Grid>
      </StandardGrid>
      {shouldShowAnnotations && (
        <Menu
          open={openAnnotationsMenu}
          anchorEl={elementRefs.current.annotations}
          onClick={() => setOpenAnnotationsMenu(false)}
        >
          <Stack>
            {Object.entries(problem.annotations)
              .filter(([, values]) => values.length)
              .map(([type, values]) => (
                <IndexItem
                  key={type}
                  label={capitalize(type)}
                  badgeLabel={values.length}
                  onClick={() => scroller(type)}
                />
              ))}
          </Stack>
        </Menu>
      )}
      {shouldShowRelatedProblems && (
        <Menu
          open={openRelatedProblemsMenu}
          anchorEl={elementRefs.current.relatedProblems}
          onClick={() => setOpenRelatedProblemsMenu(false)}
        >
          <Stack>
            {problem.upstream.length ? (
              <IndexItem
                label="Upstream"
                badgeLabel={problem.upstream.length}
                onClick={() => scroller(SECTION_KEYS.upstreamProblems)}
              />
            ) : undefined}
            {problem.downstream.length ? (
              <IndexItem
                label="Downstream"
                badgeLabel={problem.downstream.length}
                onClick={() => scroller(SECTION_KEYS.downstreamProblems)}
              />
            ) : undefined}
          </Stack>
        </Menu>
      )}
    </Paper>
  );
}
