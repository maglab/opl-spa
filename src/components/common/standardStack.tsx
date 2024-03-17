import { Stack, StackProps } from "@mui/material";
import { merge } from "lodash";
import React from "react";
import useExtendedTheme from "../../theme/useExtendedTheme";

interface StandardStackProps extends StackProps {
  main?: boolean;
  minor?: boolean;
}

export default function StandardStack({
  main,
  minor,
  children, // children must be deconstructed here otherwise React will thinks you are iterating them and give you key error
  divider,
  ...props
}: StandardStackProps) {
  const theme = useExtendedTheme();

  let spacing = 0;
  if (minor) spacing = theme.layout.minorSpacing;
  if (main) spacing = theme.layout.mainSpacing;

  spacing = divider ? spacing / 2 : spacing;
  const mergedProps = merge({ spacing }, props);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Stack divider={divider} {...mergedProps}>
      {children}
    </Stack>
  );
}

StandardStack.defaultProps = {
  main: false,
  minor: false,
};
