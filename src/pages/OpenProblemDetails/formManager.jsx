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
  type: Yup.string().required("Type is required"),
  value: Yup.string().when("type", {
    is: (type) => type === "PMID",
    then: () =>
      Yup.string()
        .matches(/^\d+$/, "Must be a valid PubMed ID")
        .required("Identifier is required"),
    otherwise: () =>
      Yup.string().when("type", {
        is: "DOI",
        then: () =>
          Yup.string()
            .matches(/^10.\d{4,9}\/[-._;()/:A-Z0-9]+$/i, "Must be a valid DOI")
            .required("Identifier is required"),
        otherwise: () => Yup.string().required("Identifier is required"),
      }),
  }),
});

const validationSchema = Yup.object().shape({
  text: Yup.string().required("Post must not be empty"),
  references: Yup.array().of(referenceSchema),
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
