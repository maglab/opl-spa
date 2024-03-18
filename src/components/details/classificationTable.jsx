import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import apiAnnotations from "../../api/apiAnnotations";
import useGetApi from "../../utils/hooks/useApi";

function RenderAnnotationEntries({ annotationArray, error }) {
  if (error) {
    return <Typography> Error </Typography>;
  }
  if (!annotationArray || annotationArray.length === 0) {
    return <Typography> None </Typography>;
  }

  return (
    <>
      {annotationArray.map((entry) => (
        <Typography key={entry.id}> {entry.name || entry.title}</Typography>
      ))}
    </>
  );
}
export default function ClassificationTable({ id }) {
  const { apiData, apiError: error } = useGetApi(
    apiAnnotations.getAnnotationsForProblem,
    { id, all: true },
    {}
  );
  return (
    <Paper>
      <TableContainer>
        <Table sx={{ color: "white" }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Typography variant="h6"> Classification</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell variant="head">
                <Typography>Open Problem ID</Typography>
              </TableCell>
              <TableCell> {id} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Gene</TableCell>
              <TableCell>
                <RenderAnnotationEntries
                  annotationArray={apiData.gene}
                  error={error}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Compound </TableCell>
              <TableCell>
                <RenderAnnotationEntries
                  annotationArray={apiData.compound}
                  error={error}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Species </TableCell>
              <TableCell>
                <RenderAnnotationEntries
                  annotationArray={apiData.compound}
                  error={error}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
