import React, { useContext } from "react";
import {
  Paper,
  Grid,
  TextField,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ViewList } from "@mui/icons-material";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";

import { OpenProblemsContext } from "../../context/context";

function SearchBar() {
  return (
    <Stack>
      <TextField
        label="Search for an open problem"
        fullWidth
        variant="filled"
        size="large"
      />
      {/* <Autocomplete
        freeSolo
        multiple
        options={[]}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <SearchCriteriaChip
              subject={option}
              subjectColor="primary"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (

        )}
      /> */}
    </Stack>
  );
}

function ButtonControls() {
  const { state, dispatch } = useContext(OpenProblemsContext);
  const { view, sorting } = state;
  const viewChangeHandler = (event, target) => {
    dispatch({ type: "setView", payload: { view: target } });
  };
  const sortingChangehandler = (event, target) => {
    dispatch({ type: "setSorting", payload: { sorting: target } });
  };
  return (
    <>
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
        <ToggleButtonGroup exclusive value={view} onChange={viewChangeHandler}>
          <ToggleButton value="list">
            <ViewList />
          </ToggleButton>
          <ToggleButton value="card">
            <ViewAgendaIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </>
  );
}

function Header() {
  return (
    <Paper elevation={3}>
      <Grid padding={2} container direction="column" gap={2}>
        <Grid item>
          <SearchBar xs={12} />
        </Grid>
        <Grid
          container
          item
          direction="row"
          justifyContent="space-between"
          xs={12}
        >
          <ButtonControls />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Header;
