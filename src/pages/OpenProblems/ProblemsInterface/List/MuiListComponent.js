import React, { useState, useCallback } from "react";
import {
  Collapse,
  ListItemButton,
  ListItemText,
  Link,
  Grid,
  Stack,
  Paper,
} from "@mui/material";
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import ListAccordionContent from "../Accordion/ListAccordionContent";
import { HashLink } from "react-router-hash-link";

const LinkToPage = React.forwardRef((props, ref) => {
  return <HashLink ref={ref} {...props} />;
});

function MuiListComponent(props) {
  const problem = props.problem;
  const id = problem.problem_id;
  const description = problem.description;
  const children = problem.children;
  const [isExpanded, setExpanded] = useState(false);
  const onClickHandler = useCallback(() => {
    if (children || description) {
      setExpanded((prevExpanded) => !prevExpanded); // Update state based on previous value
    }
  }, [children, description]);

  return (
    <Stack py={0.5} width={"100%"}>
      <Paper xs={{ wdith: "100%" }}>
        <ListItemButton
          key={id}
          onClick={onClickHandler}
          sx={{
            width: "100%",
            display: "flex",
            // justifyContent: "space-between",
            cursor: children || description ? "pointer" : "default", // Add cursor pointer if clickable
          }}
        >
          <Grid container height="100%" width="100%">
            <Grid item xs={12} height="100%" width="100%">
              <Stack
                justifyContent="space-between"
                direction="row"
                sx={{ width: "100%", height: "100%" }}
                spacing={2}
              >
                <Link
                  component={LinkToPage}
                  to={`./${id}#nav`}
                  sx={{ textDecoration: "none", color: "black" }}
                >
                  <ListItemText
                    className="text-base hover:text-theme-blue hover:underline md:text-lg"
                    primary={problem.title}
                  />{" "}
                </Link>
                {(children.length > 0 || description) && isExpanded ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </Stack>
            </Grid>
          </Grid>
        </ListItemButton>
      </Paper>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <ListAccordionContent problem={problem} />
      </Collapse>
    </Stack>
  );
}

export default MuiListComponent;
