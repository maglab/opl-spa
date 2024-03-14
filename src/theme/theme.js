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
  },
  typography: {
    fontFamily: "Lato, sans-serif",
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
  },
  layout: {
    mainSpacing: 4,
    minorSpacing: 2,
    padding: 2,
  },
});

export default theme;
