import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  ButtonGroup,
  Button,
  Chip,
} from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

function OpenProblemCard({ openProblem }) {
  const { title, description, problem_id: id } = openProblem ?? "";
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Grid container direction="column" spacing={2} padding={4}>
          <Grid item>
            <Typography variant="subtitle2"> Posted by: - </Typography>
          </Grid>
          <Grid item>
            <Link to={`/open-problems/${id}`}>
              <Typography variant="h6"> {title} </Typography>
            </Link>
          </Grid>
          <Grid item maxHeight={250} overflow="hidden" textOverflow="ellipsis">
            <Typography
              variant="body1"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: "8",
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item sx={12}>
            <Chip label="test" color="primary" />
          </Grid>
          <Grid item>
            <ButtonGroup>
              <Button
                size="small"
                startIcon={<ModeCommentIcon />}
                color="primary"
              >
                Posts
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default OpenProblemCard;
