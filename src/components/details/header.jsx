import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ProblemTag from "../common/problemTag";

export default function Header({ data, addScroller }) {
  const { title, description, references = [], tags = [] } = data;
  // Subject will be tags:

  return (
    <Paper ref={(el) => addScroller("description", el)}>
      <Stack spacing={2} padding={2} width="100%">
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
        <Divider />
        <Stack spacing={2} direction="row">
          {tags &&
            tags.map((tag) => <ProblemTag key={tag.id} label={tag.title} />)}
        </Stack>
      </Stack>
    </Paper>
  );
}
