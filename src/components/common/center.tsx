import { Stack, StackProps } from "@mui/material";
import { merge } from "lodash";

import React from "react";

export default function Center({ children, ...props }: StackProps) {
  const mergedProps = merge(
    {
      alignItems: "center",
      justifyContent: "center",
    },
    props
  );

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Stack {...mergedProps}>{children}</Stack>;
}
