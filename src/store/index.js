import { configureStore } from "@reduxjs/toolkit";
import formSlice from "../state/Question/questionFormSlice";
import questionSlice from "../state/Question/questionSlice";
import formValidationSlice from "../state/Question/formValidationSlice";
import detailsSlice from "../state/Details/detailsSlice";
import generalSlice from "../state/generalStateSlice";
import annotationSlice from "../state/Annotation/annotationSlice";

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    question: questionSlice.reducer,
    validation: formValidationSlice.reducer,
    details: detailsSlice.reducer,
    general: generalSlice.reducer,
    annotation: annotationSlice.reducer,
  },
});

export default store;
