import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

import guidance from "../../../assets/guidance/submissionGuidance.json";

const paperStyles = {
  borderColor: "info",
};
function Guidance() {
  const theme = useTheme();
  return (
    <Paper variant="outlined" borderColor="info" border="100px">
      <Box padding="2rem" border={1} borderColor={theme.palette.info.light}>
        <Typography variant="h5"> Writing a good open problem</Typography>
        <Box className="guidance-description" padding="0.5rem">
          <Typography variant="subtitle1">
            All open problems are welcome but we recommend following these
            guidelines:
          </Typography>

          <List>
            {guidance.map((pointer) => (
              <ListItem key={pointer}>
                <ListItemText primary={pointer} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  );
}

export default Guidance;
