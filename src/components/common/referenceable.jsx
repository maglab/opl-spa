import { Box } from "@mui/material";
import React from "react";

const Referenceable = React.forwardRef((props, ref) => {
  const { children, ...otherProps } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box ref={ref} {...otherProps}>
      {children}
    </Box>
  );
});

Referenceable.displayName = "Referenceable";

export default Referenceable;
