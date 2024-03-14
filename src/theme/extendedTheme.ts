import { Theme } from "@mui/material";

interface ExtendedTheme extends Theme {
  layout: {
    mainSpacing: number;
    minorSpacing: number;
    padding: number;
  };
}

export default ExtendedTheme;
