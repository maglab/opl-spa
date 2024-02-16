import { Box } from "@mui/material";
import React from "react";

function layout({ children, yPadding = 2, xPadding = 2, bgcolor }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      bgcolor={bgcolor}
      px={xPadding}
      py={yPadding}
    >
      <Box width="100%" maxWidth="md">
        {children}
      </Box>
    </Box>
  );
}

export const DefaultPageLayout = layout;
export default DefaultPageLayout;
