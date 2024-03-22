import React, { useEffect, useState } from "react";

import { merge } from "lodash";
import SORTING_KEYS from "../../constants/problemSortingKeys";
import VIEW_KEYS from "../../constants/problemViewKeys";
import QueryParamsContext from "../../contexts/queryParamsContext";
import StateContext from "../../contexts/stateContext";
import useQueryParams from "../../hooks/useQueryParams";
import { problemsQueryScheme } from "../../routes/querySchemes";
import StandardStack from "../common/standardStack";
import Header from "./header";
import OpenProblemList from "./list";

const initialState = {
  pageNum: 1,
  sorting: SORTING_KEYS.latest,
  view: VIEW_KEYS.card,
};

function Problems() {
  const queryParamsContextValue = useQueryParams(problemsQueryScheme);
  const [state, setState] = useState(initialState);
  useEffect(() => {
    const { queryParams } = queryParamsContextValue;
    setState(merge({}, initialState, queryParams));
  }, [queryParamsContextValue]);

  return (
    <QueryParamsContext.Provider value={queryParamsContextValue}>
      <StateContext.Provider value={state}>
        <StandardStack main>
          <Header />
          <OpenProblemList />
        </StandardStack>
      </StateContext.Provider>
    </QueryParamsContext.Provider>
  );
}

export default Problems;
