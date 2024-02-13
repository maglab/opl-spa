import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
  submission: {
    description: "",
    references: [{ type: "DOI", ref: "", id: 0 }], // Initialise with one empty reference
    firstName: "",
    lastName: "",
    affiliation: "",
    openProblem: null,
  },
  modal: false,
  submitStatus: {
    title: "",
    message: "",
    status: "",
  },
  postSubmissions: {
    length: 0,
  },
  commentBoxActive: false,
  submissionId: "",
};

const reducers = {
  addReference(state, actions) {
    state.submission.references.push({
      type: "Link",
      ref: "",
      id: actions.payload.id,
    });
  },
  removeReference(state, actions) {
    const filtered = state.submission.references.filter(
      (ref) => ref.id !== actions.payload.id,
    );
    state.submission.references = filtered;
  },
  setReference(state, actions) {
    const { id, type, value } = actions.payload;
    const reference = state.submission.references.find((ref) => ref.id === id);
    if (reference) {
      reference.type = type;
      reference.ref = value;
    }
    state.submission.references.map((ref) =>
      ref.id === reference.id ? (ref = reference) : ref,
    );
  },
  setFormValue(state, actions) {
    const { id } = actions.payload;
    const { value } = actions.payload;
    state.submission[id] = value;
  },
  clearFormValues(state) {
    state.submission.description = DEFAULT_STATE.submission.description;
    state.submission.firstName = DEFAULT_STATE.submission.firstName;
    state.submission.lastName = DEFAULT_STATE.submission.lastName;
    state.submission.affiliation = DEFAULT_STATE.submission.affiliation;
  },
  setOpenProblem(state, actions) {
    state.submission.openProblem = actions.payload.id;
  },
  toggleModalOpen(state) {
    state.modal = true;
  },
  toggleModalClose(state) {
    state.modal = false;
  },
  setSubmitState(state, actions) {
    const { title, message, status } = actions.payload;
    state.submitStatus = { title, message, status };
  },
  setPostsLength(state, actions) {
    state.postSubmissions.length = actions.payload.length;
  },
  toggleComment(state, actions) {
    const toActivate = actions.payload.toggle;
    if (toActivate) {
      state.commentBoxActive = true;
    } else {
      state.commentBoxActive = false;
    }
  },
  // Generic function for setting redux state
  setState(state, actions) {
    state[actions.payload.key] = actions.payload.value;
  },

  // Generic function to return back to default state

  resetState(state) {
    state = DEFAULT_STATE;
  },
};

const detailsSlice = createSlice({
  name: "details",
  initialState: DEFAULT_STATE,
  reducers,
});

export default detailsSlice;
export const detailsActions = detailsSlice.actions;
