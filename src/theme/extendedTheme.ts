import { Theme } from "@mui/material";

interface ExtendedTheme extends Theme {
  layout: {
    mainSpacing: number;
    minorSpacing: number;
    padding: number;
    selectWidth: (arg0?: number) => number;
  };
}

export default ExtendedTheme;
