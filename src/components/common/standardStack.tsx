import { Stack, StackProps } from "@mui/material";
import { isBoolean, merge } from "lodash";
import React from "react";
import useExtendedTheme from "../../theme/useExtendedTheme";

interface StandardStackProps extends Omit<StackProps, "p"> {
  main?: boolean;
  minor?: boolean;
  p?: boolean | StackProps["p"];
}

export default function StandardStack({
  main,
  minor,
  p,
  children, // children must be deconstructed here otherwise React will thinks you are iterating them and give you key error
  divider,
  ...props
}: StandardStackProps) {
  const theme = useExtendedTheme();

  let spacing = 0;
  if (minor) spacing = theme.layout.minorSpacing;
  if (main) spacing = theme.layout.mainSpacing;

  spacing = divider ? spacing / 2 : spacing;
  const mergedProps = merge(
    {
      spacing,
      p: isBoolean(p) && p ? theme.layout.padding : (p as StackProps["p"]),
    },
    props
  );

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
  p: undefined,
};
