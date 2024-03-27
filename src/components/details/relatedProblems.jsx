import {
  Divider,
  Link,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const linkStyles = {
  transition: "color 0.3s",
  "&:hover": {
    color: "primary.main",
  },
};

export default function RelatedProblemsList({
  upstream = [],
  downstream = [],
  addScroller,
}) {
  return (
    <Paper>
      <Stack spacing={2} padding={2}>
        <Typography
          variant="h6"
          ref={(el) => {
            addScroller("upstream", el);
          }}
        >
          Upstream Open Problem
        </Typography>
        <List disablePadding>
          {upstream.length > 0 ? (
            upstream.map((child) => (
              <ListItem key={child.problem_id} disableGutters>
                <Link
                  component={RouterLink}
                  to={`/open-problems/${child.problem_id}`}
                  underline="hover"
                >
                  <Typography variant="subtitle1" sx={linkStyles}>
                    {" "}
                    {child.title}
                  </Typography>
                </Link>
              </ListItem>
            ))
          ) : (
            <Typography>None</Typography>
          )}
        </List>
        <Divider />
        <Typography
          variant="h6"
          ref={(el) => {
            addScroller("downstream", el);
          }}
        >
          Downstream Open Problems{" "}
        </Typography>
        <List disablePadding>
          {downstream.length > 0 ? (
            downstream.map((child) => (
              <ListItem key={child.problem_id} disableGutters>
                <Link
                  component={RouterLink}
                  to={`/open-problems/${child.problem_id}`}
                  underline="hover"
                >
                  <Typography variant="subtitle1" sx={linkStyles}>
                    {" "}
                    {child.title}
                  </Typography>
                </Link>
              </ListItem>
            ))
          ) : (
            <Typography>None</Typography>
          )}
        </List>
      </Stack>
    </Paper>
  );
}
