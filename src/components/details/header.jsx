import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import { useParams } from "react-router-dom";

export default function Header({ data }) {
  const { title, description, references = [], tags = [] } = data;
  const { id } = useParams();
  // Subject will be tags:

  return (
    <Paper>
      <Stack spacing={2} padding={2} width="100%">
        <Typography variant="h5"> {title} </Typography>
        <Divider />
        {description && <Typography variant="body2"> {description}</Typography>}
        <List>
          <Typography variant="h6"> References </Typography>
          {references.length > 0 ? (
            references.map((reference) => (
              <ListItem disableGutters>
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
            tags.map((tag) => (
              <Chip color="primary" label={tag.title} key={tag.id} />
            ))}
        </Stack>
      </Stack>
    </Paper>
  );
}
