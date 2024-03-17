import { ViewList } from "@mui/icons-material";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import {
  Grid,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useContext } from "react";
import QueryParamsContext from "../../contexts/queryParamsContext";

function Header() {
  const { queryParams, updateQueryParams } = useContext(QueryParamsContext);
  const { sorting, view } = queryParams;
  const viewChangeHandler = (_, target) => {
    updateQueryParams({ view: target });
  };
  const sortingChangehandler = (_, target) => {
    updateQueryParams({ sorting: target });
  };
  return (
    <Paper elevation={3}>
      <Grid padding={2} container direction="column" gap={2}>
        <Grid item>
          <Stack>
            <TextField
              label="Search for an open problem"
              fullWidth
              variant="filled"
              size="large"
            />
          </Stack>{" "}
        </Grid>
        <Grid
          container
          item
          direction="row"
          justifyContent="space-between"
          xs={12}
        >
          <Grid item>
            <ToggleButtonGroup
              variant="outlined"
              color="info"
              onChange={sortingChangehandler}
              value={sorting}
              exclusive
            >
              <ToggleButton value="latest">Latest</ToggleButton>
              <ToggleButton value="top"> Top</ToggleButton>
              <ToggleButton value="answered">Answered</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              exclusive
              value={view}
              onChange={viewChangeHandler}
            >
              <ToggleButton value="list">
                <ViewList />
              </ToggleButton>
              <ToggleButton value="card">
                <ViewAgendaIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Header;
