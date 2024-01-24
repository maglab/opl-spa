import { createSlice } from "@reduxjs/toolkit";

/// This slice and actions are related to the question form.

const DEFAULT_STATE = {
  submitFormOpen: false,
  chosenParent: false,
  formDetails: {
    title: "",
    description: "",
    parentTitle: "Submit as a root problem",
    parentId: null,
    species: "",
    referencesTextArea: "",
    references: [],
    validReferences: [],
    firstName: "",
    lastName: "",
    email: "",
    organisation: "",
    jobfield: "",
  },
  submitModalOpen: false,
  submitStatus: {
    status: null,
    title: null,
    message: null,
  },
};
//Paylod data structure: {hasParent: boolean, parent: 'id-string'}
const reducers = {
  chooseParent(state, action) {
    state.chosenParent = true;
    state.formDetails.parentTitle = action.payload.chosenParentTitle;
    state.formDetails.parentId = action.payload.parentId;
  },
  inputChange(state, action) {
    state.formDetails[action.payload.id] = action.payload.value;
  },
  selectChange(state, action) {
    state.formDetails.parentId = action.payload.id;
  },
  setInputReferences(state, action) {
    state.formDetails.referencesTextArea = action.payload.value;
  },
  setReferences(state, action) {
    const referenceArray = [];
    const retrievedReferences = action.payload.references;
    for (const ref of retrievedReferences) {
      const index = ref.indexOf(":");
      const prefix = ref.substring(0, index);
      const suffix = ref.substring(index + 1);
      switch (prefix) {
        case "doi":
          const doi = suffix;
          referenceArray.push({ type: "DOI", value: doi });
          break;
        case "pmid":
          const pmid = suffix;
          referenceArray.push({ type: "PMID", value: pmid });
          break;
        // If these prefixes are not included, the reference is invalid and will not be added to the array
        default:
          break;
      }
    }

    state.formDetails.references = referenceArray;
  },
  setValidReferences(state, action) {
    state.formDetails.validReferences = action.payload.validReferences;
  },
  resetForm: (state, actions) => {
    const exit = actions.payload.exit;
    if (state.submitFormOpen && !exit) {
      // Preserve parentTitle and parentId, and reset everything else
      state.formDetails = {
        ...DEFAULT_STATE.formDetails,
        parentTitle: state.formDetails.parentTitle,
        parentId: state.formDetails.parentId,
      };
    } else {
      Object.assign(state, DEFAULT_STATE);
    }
  },
  setSubmitStatus(state, action) {
    state.submitStatus = {
      status: action.payload.status,
      title: action.payload.title,
      message: action.payload.message,
    };
  },
  setState(state, actions) {
    state[actions.payload.key] = actions.payload.value;
  },
  clearState(state, actions) {
    state[actions.payload.key] = DEFAULT_STATE[actions.payload.key];
  },
  toggleTrue(state, action) {
    state[action.payload.key] = true;
  },
  toggleFalse() {
    state[action.payload.key] = false;
  },
};

const formSlice = createSlice({
  name: "form",
  initialState: DEFAULT_STATE,
  reducers: reducers,
});

export default formSlice;
export const formActions = formSlice.actions;
