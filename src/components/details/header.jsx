import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

import { useParams } from "react-router-dom";
import apiAnnotations from "../../api/apiAnnotations";
import useGetApi from "../../utils/hooks/useApi";

export default function Header({ data }) {
  const { title, description } = data;
  const { id } = useParams();
  // Subject will be tags:
  const params = { annotation: "subject", id };
  const { apiData: tags } = useGetApi(
    apiAnnotations.getAnnotationsForProblem,
    params,
    []
  );
  return (
    <Paper>
      <Stack spacing={2} padding={2}>
        <Typography variant="h5"> {title} </Typography>
        <Divider />
        <Typography variant="body1"> {description && description}</Typography>
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
