import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const initialValues = {
  title: "",
  description: "",
  references: [], // DOI and PMID values
  first_name: "",
  last_name: "",
  organisation: "",
  job_field: "",
  email: "",
};

const referenceSchema = Yup.object().shape({
  type: Yup.string().oneOf(["PMID", "DOI"]),
  value: Yup.string()
    .required("Identifier is required")
    .when("type", (type, schema) => {
      switch (type) {
        case "PMID":
          schema.matches(/^\d+$/, "Must be a valid PubMed ID");
          return;
        case "DOI":
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
