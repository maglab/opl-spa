import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import ProblemTag from "../common/problemTag";
import StandardGrid from "../common/standardGrid";
import StandardStack from "../common/standardStack";

export default function Description({ data, addScroller }) {
  const { title, description, references = [], tags = [] } = data;
  // Subject will be tags:

  return (
    <Paper ref={(el) => addScroller("description", el)}>
      <StandardStack minor p>
        <Typography variant="h5"> {title} </Typography>
        <Divider />
        {description && <Typography variant="body2"> {description}</Typography>}
        <List>
          <Typography variant="h6"> References </Typography>
          {references.length > 0 ? (
            references.map((reference) => (
              <ListItem disableGutters key={reference.id}>
                <ListItemText
                  primary={reference.citation}
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </ListItem>
            ))
          ) : (
            <Typography>None</Typography>
          )}
        </List>
        {tags && tags.length ? (
          <>
            <Divider />
            <StandardGrid minor direction="row">
              {tags &&
                tags.map((tag) => (
                  <Grid item key={tag.id} xs="auto">
                    <ProblemTag label={tag.title} />
                  </Grid>
                ))}
            </StandardGrid>
          </>
        ) : undefined}
      </StandardStack>
    </Paper>
  );
}
