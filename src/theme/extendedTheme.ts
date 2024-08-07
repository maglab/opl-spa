import { Palette, PaletteColor, Theme } from "@mui/material";

interface ExtendedPalette extends Palette {
  problemTag: PaletteColor;
}

interface ExtendedTheme extends Theme {
  layout: {
    mainSpacing: number;
    minorSpacing: number;
    padding: number;
    selectWidth: (arg0?: number) => number;
  };
  palette: ExtendedPalette;
}

export default ExtendedTheme;
