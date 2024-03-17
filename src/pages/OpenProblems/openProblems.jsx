import React from "react";

import StandardStack from "../../components/common/standardStack";
import QueryParamsContext from "../../contexts/queryParamsContext";
import useQueryParams from "../../hooks/useQueryParams";
import { problemsQueryScheme } from "../../routes/querySchemes";
import Header from "./header";
import OpenProblemList from "./list";

// No loading rendering as of yet
function OpenProblems() {
  const contextValue = useQueryParams(problemsQueryScheme, {
    query: "",
    pageNum: 1,
    sorting: "latest",
    view: "card",
  });

  return (
    <QueryParamsContext.Provider value={contextValue}>
      <StandardStack main>
        <Header />
        <OpenProblemList />
      </StandardStack>
    </QueryParamsContext.Provider>
  );
}

export default OpenProblems;
