import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import REFERENCE_TYPE_KEYS from "../../constants/referenceTypes";

const initialValues = {
  title: "",
  description: "",
  references: [], // DOI and PMID values
  tags: [], // new
  compounds: [], // new
  species: [], // new
  genes: [], // new
  first_name: "",
  last_name: "",
  organisation: "",
  job_field: "",
  email: "",
};

const referenceSchema = Yup.object().shape({
  type: Yup.string().oneOf(Object.values(REFERENCE_TYPE_KEYS)),
  value: Yup.string()
    .required("Identifier is required")
    .when("type", ([type], schema) => {
      switch (type) {
        case REFERENCE_TYPE_KEYS.pmid:
          schema.matches(/^\d+$/, "Must be a valid PubMed ID");
          return;
        case REFERENCE_TYPE_KEYS.doi:
          schema.matches(
            /^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i,
            "Must be a valid DOI"
          );
          return;
        default:
          throw new Error("Should not reach this line");
      }
    }),
});

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title must not be empty"),
  description: Yup.string().required("Description must not be empty"),
  references: Yup.array().of(referenceSchema),
  email: Yup.string().email("Must be a valid email address"),
  tags: Yup.array()
    .of(
      Yup.mixed().test(
        "is-string-or-object",
        "Each tag must be either a string or an object",
        (value) =>
          typeof value === "string" ||
          (typeof value === "object" && value !== null)
      )
    )
    .required("At least one tag is required")
    .min(1, "At least one tag is required"),
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
