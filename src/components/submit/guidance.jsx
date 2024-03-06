import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import guidance from "../../assets/guidance/submissionGuidance.json";

// boxStyles for sx because using system props sends warning to console.
const stackStyles = {
  borderColor: "primary.main",
};

function Guidance() {
  return (
    <Stack
      sx={stackStyles}
      borderColor="primary.main"
      padding={2}
      alignItems="center"
    >
      <Typography variant="h5"> Writing a good open problem</Typography>
      <Box className="guidance-description" padding={1}>
        <Typography variant="subtitle1" sx={{ textDecoration: "underline" }}>
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
    </Stack>
  );
}

export default Guidance;
