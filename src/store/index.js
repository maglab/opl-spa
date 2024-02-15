import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "../state/Question/questionSlice";
import detailsSlice from "../state/Details/detailsSlice";
import generalSlice from "../state/generalStateSlice";
import annotationSlice from "../state/Annotation/annotationSlice";

const store = configureStore({
  reducer: {
    question: questionSlice.reducer,
    details: detailsSlice.reducer,
    general: generalSlice.reducer,
    annotation: annotationSlice.reducer,
  },
});

export default store;
