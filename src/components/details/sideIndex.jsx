import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListSubheader, Paper } from "@mui/material";
import { capitalize } from "lodash";
import React, { useState } from "react";
import IndexItem from "./indexItem";

export default function SideIndex({ problem, scroller }) {
  const [openAnnotations, setOpenAnnotations] = useState(true);
  const [openRelatedProblems, setOpenRelatedProblems] = useState(true);

  return (
    <Paper>
      <List>
        <ListSubheader>Index</ListSubheader>
        <IndexItem
          label="Description"
          onClick={() => scroller("description")}
        />
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
                  onClick={() => scroller("upstream")}
                />
              ) : undefined}
              {problem.downstream.length ? (
                <IndexItem
                  label="Downstream"
                  badgeLabel={problem.downstream.length}
                  pl={2}
                  onClick={() => scroller("downstream")}
                />
              ) : undefined}
            </List>
          </Collapse>
        </>
        <IndexItem label="Solutions" onClick={() => scroller("solutions")} />
        <IndexItem label="Discussion" onClick={() => scroller("discussion")} />
      </List>
    </Paper>
  );
}
