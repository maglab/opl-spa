import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: null,
};

const reducers = {
  setState(state, actions) {
    state[actions.payload.key] = actions.payload.value;
  },

  setAuthState(state, actions) {
    state.user = actions.payload.user;
    state.isAuthenticated = actions.payload.isAuthenticated;
  },
  logout(state) {
    state = DEFAULT_STATE;
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: DEFAULT_STATE,
  reducers: reducers,
});

export default userSlice;
export const userActions = userSlice.actions;
