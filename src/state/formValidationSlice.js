import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  title: false,
  description: false,
  email: false,
};

const reducers = {
  checkTitle(state, actions) {
    if (actions.payload.title.trim().length > 0) {
      state.title = true;
    } else {
      state.title = false;
    }
  },
  checkDescription(state, actions) {
    if (actions.payload.description.trim().length > 0) {
      state.description = true;
    } else {
      state.description = false;
    }
  },
  checkEmail(state, actions) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(actions.payload.email)) {
      state.email = true;
    } else {
      state.email = false;
    }
  },
};

const formValidationSlice = createSlice({
  name: "validation",
  initialState: DEFAULT_STATE,
  reducers,
});

export default formValidationSlice;
export const formValidationActions = formValidationSlice.actions;
