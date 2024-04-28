import { Box, BoxProps, StackProps } from "@mui/material";
import { merge } from "lodash";
import React from "react";
import useExtendedTheme from "../../theme/useExtendedTheme";
import Center from "./center";

interface DefaultMarginProps extends StackProps {
  innerProps?: BoxProps;
}

export default function DefaultMargin({
  children, // children must be deconstructed here otherwise React will thinks you are iterating them and give you key error
  innerProps,
  ...props
}: DefaultMarginProps) {
  const theme = useExtendedTheme();
  const mergedProps = merge(
    {
      p: theme.layout.mainSpacing,
    },
    props
  );
  const mergedInnerProps = merge(
    {
      width: "100%",
      maxWidth: "lg",
    },
    innerProps
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Center {...mergedProps}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Box {...mergedInnerProps}>{children}</Box>
    </Center>
  );
}

DefaultMargin.defaultProps = {
  innerProps: {},
};
