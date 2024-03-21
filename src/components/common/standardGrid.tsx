import { Box, Grid, GridProps } from "@mui/material";
import { merge } from "lodash";
import React from "react";
import useExtendedTheme from "../../theme/useExtendedTheme";

interface StandardGridProps extends GridProps {
  main: boolean;
  minor: boolean;
}

export default function StandardGrid({
  main,
  minor,
  children, // children must be deconstructed here otherwise React will thinks you are iterating them and give you key error
  ...props
}: StandardGridProps) {
  const theme = useExtendedTheme();

  let spacing = 0;
  if (minor) spacing = theme.layout.minorSpacing;
  if (main) spacing = theme.layout.mainSpacing;

  const mergedProps = merge({ gap: spacing, p: theme.layout.padding }, props);

  return (
    <Box>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Grid container {...mergedProps}>
        {children}
      </Grid>
    </Box>
  );
}
