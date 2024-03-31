import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import HeaderContent from "../common/headerContent";
import StandardStack from "../common/standardStack";

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
      <StandardStack minor p divider={<Divider />}>
        {upstream.length ? (
          <Box
            ref={(el) => {
              addScroller("upstream", el);
            }}
          >
            <HeaderContent header="Upstream Problems">
              <List>
                {upstream.map((child) => (
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
                ))}
              </List>
            </HeaderContent>
          </Box>
        ) : undefined}
        {downstream.length ? (
          <Box
            ref={(el) => {
              addScroller("downstream", el);
            }}
          >
            <HeaderContent header="Downstream Problems">
              <List>
                {downstream.map((child) => (
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
                ))}
              </List>
            </HeaderContent>
          </Box>
        ) : undefined}
      </StandardStack>
    </Paper>
  );
}
