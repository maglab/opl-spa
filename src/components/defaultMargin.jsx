import { Box } from "@mui/material";
import React from "react";

function margin({ children, yPadding = 8, xPadding = 2, bgcolor }) {
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

export const DefaultMargin = margin;
export default DefaultMargin;
