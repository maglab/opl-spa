import { Box, Grid, GridProps } from "@mui/material";
import { isBoolean, merge } from "lodash";
import React from "react";
import useExtendedTheme from "../../theme/useExtendedTheme";

interface StandardGridProps extends Omit<GridProps, "p"> {
  main?: boolean;
  minor?: boolean;
  p?: boolean | GridProps["p"];
}

export default function StandardGrid({
  main,
  minor,
  p,
  children, // children must be deconstructed here otherwise React will thinks you are iterating them and give you key error
  ...props
}: StandardGridProps) {
  const theme = useExtendedTheme();

  let spacing = 0;
  if (minor) spacing = theme.layout.minorSpacing;
  if (main) spacing = theme.layout.mainSpacing;

  const mergedProps = merge(
    {
      spacing,
      p: isBoolean(p) && p ? theme.layout.padding : (p as GridProps["p"]),
    },
    props
  );

  return (
    <Box>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Grid container {...mergedProps}>
        {children}
      </Grid>
    </Box>
  );
}

StandardGrid.defaultProps = {
  main: false,
  minor: false,
  p: undefined,
};
