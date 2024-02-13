import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  annotation: "",
  details: {},
};

const reducers = {
  setState(state, actions) {
    state[actions.payload.key] = actions.payload.value;
  },
};

const annotationSlice = createSlice({
  name: "annotation",
  initialState: INITIAL_STATE,
  reducers: reducers,
});

export default annotationSlice;
export const annotationActions = annotationSlice.actions;
