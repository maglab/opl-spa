import { ViewList } from "@mui/icons-material";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import {
  Divider,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { capitalize } from "lodash";
import React, { useContext } from "react";
import StandardGrid from "../../components/common/standardGrid";
import StandardStack from "../../components/common/standardStack";
import SORTING_KEYS from "../../constants/problemSortingKeys";
import VIEW_KEYS from "../../constants/problemViewKeys";
import QueryParamsContext from "../../contexts/queryParamsContext";
import Search from "./search";

function Header() {
  const { queryParams, editQueryParams } = useContext(QueryParamsContext);
  const { sorting, view } = queryParams;
  const viewChangeHandler = (_, target) => {
    editQueryParams((draft) => {
      draft.view = target;
    });
  };
  const sortingChangehandler = (_, target) => {
    editQueryParams((draft) => {
      draft.sorting = target;
    });
  };
  return (
    <Paper elevation={1}>
      <StandardStack minor>
        <Search />
        <Divider />
        <StandardGrid p={0} direction="row">
          <Grid item xs="auto">
            <ToggleButtonGroup
              size="small"
              variant="outlined"
              color="info"
              onChange={sortingChangehandler}
              value={sorting}
              exclusive
            >
              {Object.values(SORTING_KEYS).map((key) => (
                <ToggleButton key={key} value={key}>
                  {capitalize(key)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs />
          <Grid item xs="auto">
            <ToggleButtonGroup
              size="small"
              exclusive
              value={view}
              onChange={viewChangeHandler}
            >
              <ToggleButton value={VIEW_KEYS.list}>
                <ViewList />
              </ToggleButton>
              <ToggleButton value={VIEW_KEYS.card}>
                <ViewAgendaIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </StandardGrid>
      </StandardStack>
    </Paper>
  );
}

export default Header;
