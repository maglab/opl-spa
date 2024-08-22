import { Chip, ChipProps } from "@mui/material";
import { merge } from "lodash";
import React from "react";
import useExtendedTheme from "../../theme/useExtendedTheme";

export default function ProblemTag(props: ChipProps) {
  const theme = useExtendedTheme();
  const mergedProps = merge(
    { sx: { bgcolor: theme.palette.problemTag.main }, clickable: true }, // Ensure the Chip is clickable
    props
  );

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Chip {...mergedProps} />;
}
