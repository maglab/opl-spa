import React, { createContext, useReducer, useMemo } from "react";

export const OpenProblemsContext = createContext({});

const initialState = {
  page: 1,
  count: 0,
  openProblems: [],
  view: "card",
  sorting: "top",
  query: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setSorting":
      return { ...state, sorting: action.payload.sorting };
    case "setView":
      return { ...state, view: action.payload.view };
    case "setPage":
      return { ...state, page: action.payload.page };
    case "setCount":
      return { ...state, count: action.payload.count };
    case "setQuery":
      return { ...state, query: action.payload.query };
    case "fetchSuccess":
      return {
        ...state,
        isLoading: false,
        count: action.payload.totalCount,
        openProblems: action.payload.data,
      };
    default:
      return state;
  }
};

export default function OpenProblemProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <OpenProblemsContext.Provider value={value}>
      {children}
    </OpenProblemsContext.Provider>
  );
}
