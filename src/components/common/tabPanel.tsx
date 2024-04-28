import { useTabContext } from "@mui/lab";
import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";

interface TabProps {
  value: string;
}

// Replace MUI TabPanel with this component, as child states are lost from tab change. This prevents that.
function TabPanel({ children, value }: PropsWithChildren<TabProps>) {
  const { value: contextValue } = useTabContext() || {};
  return (
    <Box
      sx={{ display: value === contextValue ? "block" : "none" }}
      key={value}
    >
      {children}
    </Box>
  );
}

export default TabPanel;
