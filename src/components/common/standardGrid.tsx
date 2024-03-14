import { Box, Grid, GridProps, useTheme } from "@mui/material";
import { merge } from "lodash";
import React from "react";
import ExtendedTheme from "../../theme/extendedTheme";

interface StandardGridProps extends GridProps {
  main: boolean;
  minor: boolean;
}

export default function StandardGrid({
  main,
  minor,
  ...props
}: StandardGridProps) {
  const theme = useTheme() as ExtendedTheme;

  let spacing = 0;
  if (minor) spacing = theme.layout.minorSpacing;
  if (main) spacing = theme.layout.mainSpacing;

  const mergedProps = merge(
    { rowSpacing: spacing, columnSpacing: spacing },
    props
  );

  return (
    <Box>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Grid container {...mergedProps} />
    </Box>
  );
}
