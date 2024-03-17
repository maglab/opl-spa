import * as Yup from "yup";

export const problemsQueryScheme = Yup.object().shape({
  query: Yup.string(),
  pageNum: Yup.number().positive().integer(),
  sorting: Yup.string().oneOf(["top", "latest", "answered"]),
  view: Yup.string().oneOf(["card", "list"]),
});

export const otherScheme = {};
