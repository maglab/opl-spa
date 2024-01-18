import { createSlice } from "@reduxjs/toolkit";

// This slice and these actions are related to how the quetsions are viewed including search results from the search bar.

export const DEFAULT_STATE = {
  viewType: "table",
  searchQuery: "",
  filteredResults: null,
  filterOpen: false,
  filters: {
    sorting: "latest",
    subject: [],
    gene: [],
    compound: [],
    species: [],
  },
  openProblem: {},
  allProblems: null,
  count: null,
  page: null,
  nextPage: null,
};

const reducers = {
  removeFilters(state, actions) {
    const selectedFilter = actions.payload.filter;
    const idToRemove = Number(actions.payload.id);
    const currentArray = state.filters[selectedFilter];
    const removedArray = currentArray.filter((item) => item.id !== idToRemove);
    state.filters[selectedFilter] = removedArray;
  },
  updateFilters(state, actions) {
    //The headless UI that uses this always returns an Array
    const newArray = actions.payload.value;
    //To ensure that there are always unique values:
    const unique = Array.from(new Set(newArray));
    state.filters[actions.payload.filter] = unique;
  },
  toggleTreeState(state) {
    //Set the view type of the question to a hierarchical list
    state.viewType = "tree";
  },
  toggleListState(state) {
    //Set the view type of the question as a list
    state.viewType = "table";
  },
  setQuery(state, actions) {
    //Sets the search query from search bar - unecessary with setSate method
    state.searchQuery = actions.payload.query;
  },
  setSorting(state, actions) {
    state.filters.sorting = actions.payload.value;
  },
  setState(state, actions) {
    state[actions.payload.key] = actions.payload.value;
  },
};

const questionSlice = createSlice({
  name: "question",
  initialState: DEFAULT_STATE,
  reducers: reducers,
});

export default questionSlice;
export const questionActions = questionSlice.actions;
