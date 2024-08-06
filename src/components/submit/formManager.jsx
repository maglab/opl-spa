import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import REFERENCE_TYPE_KEYS from "../../constants/referenceTypes";

const initialValues = {
  title: "",
  description: "",
  references: [], // DOI and PMID values
  tags: [],
  compounds: [],
  species: [],
  genes: [],
  first_name: "",
  last_name: "",
  organisation: "",
  job_field: "",
  email: "",
  notify_user: false,
};

const referenceSchema = Yup.object().shape({
  type: Yup.string().oneOf(Object.values(REFERENCE_TYPE_KEYS)),
  value: Yup.string()
    .required("Identifier is required")
    .when("type", ([type], schema) => {
      switch (type) {
        case REFERENCE_TYPE_KEYS.pmid:
          return schema.matches(/^\d+$/, "Must be a valid PubMed ID");
        case REFERENCE_TYPE_KEYS.doi:
          return schema.matches(
            /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i,
            "Must be a valid DOI"
          );
        default:
          return schema; // No validation if type is missing or unknown
      }
    }),
});

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title must not be empty"),
  description: Yup.string(),
  references: Yup.array().of(referenceSchema),
  notify_user: Yup.boolean(),
  email: Yup.string()
    .email("Must be a valid email address")
    .when("notify_user", {
      is: true,
      then: (schema) =>
        schema.required(
          "An email must be provided when agreeing to be notified."
        ),
      otherwise: (schema) => schema,
    }),
  tags: Yup.array().of(
    Yup.mixed().test(
      "is-string-or-object",
      "Each tag must be either a string or an object",
      (value) =>
        typeof value === "string" ||
        (typeof value === "object" && value !== null)
    )
  ),
  // .required("At least one tag is required")
  // .min(1, "At least one tag is required")
  compounds: Yup.array().of(
    Yup.mixed().test(
      "is-string-or-object",
      "Each item must be either a string or an object",
      (value) =>
        typeof value === "string" ||
        (typeof value === "object" && value !== null)
    )
  ),
  species: Yup.array().of(
    Yup.mixed().test(
      "is-string-or-object",
      "Each item must be either a string or an object",
      (value) =>
        typeof value === "string" ||
        (typeof value === "object" && value !== null)
    )
  ),
  genes: Yup.array().of(
    Yup.mixed().test(
      "is-string-or-object",
      "Each item must be either a string or an object",
      (value) =>
        typeof value === "string" ||
        (typeof value === "object" && value !== null)
    )
  ),
});

export default function FormManager({ onSubmitHandler, children }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {children}
    </Formik>
  );
}
