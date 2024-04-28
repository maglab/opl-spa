import { StackProps, Typography, TypographyProps } from "@mui/material";
import { merge } from "lodash";
import React from "react";
import StandardStack from "./standardStack";

interface HeaderContentProps extends StackProps {
  header: string | React.JSX.Element;
  headerProps?: TypographyProps;
}

function createHeaderComponent(
  header: string | React.JSX.Element,
  headerProps?: TypographyProps
) {
  if (typeof header === "string") {
    const props = merge(
      {
        variant: "h6",
        sx: { width: "100%" },
      },
      headerProps ?? {}
    );
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Typography {...props}>{header}</Typography>;
  }
  return header;
}

export default function HeaderContent({
  header,
  headerProps,
  children,
  ...stackProps
}: HeaderContentProps) {
  const headerComponent = createHeaderComponent(header, headerProps);
  const props = merge({}, stackProps);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StandardStack minor {...props}>
      {headerComponent}
      {children}
    </StandardStack>
  );
}

HeaderContent.defaultProps = {
  headerProps: undefined,
};
