import {
  Divider,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { capitalize } from "lodash";
import React, { useContext } from "react";
import SORTING_KEYS from "../../constants/problemSortingKeys";
import QueryParamsContext from "../../contexts/queryParamsContext";
import StandardGrid from "../common/standardGrid";
import StandardStack from "../common/standardStack";
import Search from "./search";

function Header() {
  const { queryParams, editQueryParams } = useContext(QueryParamsContext);
  const { sorting } = queryParams;
  const sortingChangehandler = (_, target) => {
    editQueryParams((draft) => {
      draft.sorting = target;
    });
  };
  return (
    <Paper elevation={1}>
      <StandardStack minor p>
        <Search />
        <Divider />
        <StandardGrid direction="row" container>
          <Grid item xs={12} container>
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
        </StandardGrid>
      </StandardStack>
    </Paper>
  );
}

export default Header;
