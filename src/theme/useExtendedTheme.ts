import { useTheme } from "@mui/material";
import ExtendedTheme from "./extendedTheme";

const useExtendedTheme = () => {
  const theme = useTheme();
  return theme as ExtendedTheme;
};

export default useExtendedTheme;
