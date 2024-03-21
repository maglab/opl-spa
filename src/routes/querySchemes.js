import * as Yup from "yup";
import SEARCH_SUBJECTS from "../constants/problemQuerySubjectKeys";
import SORTING_KEYS from "../constants/problemSortingKeys";
import VIEW_KEYS from "../constants/problemViewKeys";

export const problemSearchCriterionScheme = Yup.string().matches(
  new RegExp(`^(${Object.values(SEARCH_SUBJECTS).join("|")}):`)
);

export const problemsQueryScheme = Yup.object().shape({
  search: Yup.array().of(problemSearchCriterionScheme),
  pageNum: Yup.number().positive().integer(),
  sorting: Yup.string().oneOf(Object.values(SORTING_KEYS)),
  view: Yup.string().oneOf(Object.values(VIEW_KEYS)),
});

export const otherScheme = {};
