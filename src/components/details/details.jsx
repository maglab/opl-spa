import { Box, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import React, { useCallback, useMemo, useRef } from "react";

import { useParams } from "react-router-dom";
import { useGetProblemDetail } from "../../queries/problems";
import useExtendedTheme from "../../theme/useExtendedTheme";
import Center from "../common/center";
import StandardGrid from "../common/standardGrid";
import StandardStack from "../common/standardStack";
import Annotations from "./annotations";
import Description from "./description";
import DiscussionSolution from "./discussionSolution";
import References from "./references";
import RelatedProblems from "./relatedProblems";
import SideIndex from "./sideIndex";
import TopIndex from "./topIndex";

export default function Details() {
  const theme = useExtendedTheme();
  const { id: problemId } = useParams();
  const getDetailState = useGetProblemDetail(problemId);
  const problem = useMemo(() => {
    if (getDetailState.data?.data) {
      const details = getDetailState.data.data;
      const { genes, species, compounds } = details;
      return {
        ...details,
        upstream: details.parent_problem ? [details.parent_problem] : [],
        downstream: details.children,
        annotations: { genes, species, compounds },
      };
    }
    return null;
  }, [getDetailState]);
  const compact = useMediaQuery(theme.breakpoints.up("md"));
  const scrollerRefs = useRef({});
  const addScroller = useCallback((key, el, additionalAction) => {
    scrollerRefs.current[key] = {
      element: el,
      additionalAction,
    };
  }, []);
  const scroller = useCallback((key) => {
    const ref = scrollerRefs.current[key];
    if (ref) {
      ref.element.scrollIntoView({ behavior: "smooth" });
      ref.additionalAction?.();
    }
  }, []);

  if (problem) {
    return (
      <StandardGrid main>
        {compact && (
          <Grid item md="auto" xs={12}>
            <Box
              sx={{
                position: "sticky",
                top: theme.spacing(theme.layout.mainSpacing),
              }}
            >
              <SideIndex problem={problem} scroller={scroller} />
            </Box>
          </Grid>
        )}
        <Grid item xs>
          <StandardStack main>
            {!compact && (
              <Box
                sx={{
                  position: "sticky",
                  top: 0,
                }}
                zIndex={1000}
              >
                <TopIndex problem={problem} scroller={scroller} />
              </Box>
            )}
            <StandardStack minor>
              <Description data={problem} addScroller={addScroller} />
              {problem.references?.length ? (
                <References
                  references={problem.references}
                  addScroller={addScroller}
                />
              ) : undefined}
              <Annotations
                addScroller={addScroller}
                compounds={problem.annotations.compounds}
                genes={problem.annotations.genes}
                species={problem.annotations.species}
              />
              <RelatedProblems
                upstream={problem.upstream}
                downstream={problem.downstream}
                addScroller={addScroller}
              />
              <DiscussionSolution addScroller={addScroller} />
            </StandardStack>
          </StandardStack>
        </Grid>
      </StandardGrid>
    );
  }

  return (
    <Center>
      <CircularProgress />
    </Center>
  );
}
