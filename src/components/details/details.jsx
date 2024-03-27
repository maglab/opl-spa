import { Box, CircularProgress, Grid, useMediaQuery } from "@mui/material";
import React, { useCallback, useMemo, useRef } from "react";

import { useParams } from "react-router-dom";
import {
  useGetProblemAllAnnotations,
  useGetProblemDetail,
} from "../../queries/problems";
import useExtendedTheme from "../../theme/useExtendedTheme";
import Center from "../common/center";
import StandardGrid from "../common/standardGrid";
import StandardStack from "../common/standardStack";
import DiscussionSolution from "./discussionSolution";
import Header from "./header";
import RelatedProblemsList from "./relatedProblems";
import SideIndex from "./sideIndex";
import TopIndex from "./topIndex";

export default function Details() {
  const theme = useExtendedTheme();
  const { id: problemId } = useParams();
  const getDetailState = useGetProblemDetail(problemId);
  const getAnnotationsState = useGetProblemAllAnnotations(problemId);
  const problem = useMemo(() => {
    if (getDetailState.data?.data && getAnnotationsState.data?.data) {
      const details = getDetailState.data.data;
      const annotations = getAnnotationsState.data.data;

      return {
        ...details,
        upstream: details.parent_problem ? [details.parent_problem] : [],
        downstream: details.children,
        annotations: { ...annotations },
      };
    }
    return null;
  }, [getDetailState, getAnnotationsState]);
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
              {problem ? (
                <>
                  <Header data={problem} addScroller={addScroller} />
                  <DiscussionSolution addScroller={addScroller} />
                  <RelatedProblemsList
                    upstream={problem.upstream}
                    downstream={problem.downstream}
                    addScroller={addScroller}
                  />
                </>
              ) : undefined}
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
