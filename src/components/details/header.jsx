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
import apiAnnotations from "../../api/apiAnnotations";
import useGetApi from "../../utils/hooks/useApi";

export default function Header({ data }) {
  const { title, description, references = [] } = data;
  const { id } = useParams();
  // Subject will be tags:
  const params = { annotation: "tag", id };
  const { apiData: tags } = useGetApi(
    apiAnnotations.getAnnotationsForProblem,
    params,
    []
  );
  return (
    <Paper>
      <Stack spacing={2} padding={2} width="100%">
        <Typography variant="h5"> {title} </Typography>
        <Divider />
        <Typography variant="body1"> {description && description}</Typography>
        <List>
          <Typography variant="h6"> References </Typography>

          {references.length > 0 ? (
            references.map((reference) => (
              <ListItem disableGutters>
                <ListItemText primary={reference.citation} />
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
