import { Stack, StackProps } from "@mui/material";
import { merge } from "lodash";
import React from "react";
import useExtendedTheme from "../../hooks/useExtendedThem";

interface StandardStackProps extends StackProps {
  main?: boolean;
  minor?: boolean;
}

export default function StandardStack({
  main,
  minor,
  divider,
  ...props
}: StandardStackProps) {
  const theme = useExtendedTheme();

  let spacing = 0;
  if (minor) spacing = theme.layout.minorSpacing;
  if (main) spacing = theme.layout.mainSpacing;

  spacing = divider ? spacing / 2 : spacing;
  const mergedProps = merge({ spacing }, props);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Stack divider={divider} {...mergedProps} />;
}

StandardStack.defaultProps = {
  main: false,
  minor: false,
};
