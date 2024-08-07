import { createTheme } from "@mui/material";
import { blue, blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[800],
    },
    secondary: {
      main: blueGrey[900],
    },
    problemTag: {
      main: blue[100],
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
    button: {
      textTransform: "none",
    },
  },
  layout: {
    mainSpacing: 4,
    minorSpacing: 2,
    padding: 2,
    selectWidth: (unit = 1) => unit * 30 + 120,
  },
});

export default theme;
