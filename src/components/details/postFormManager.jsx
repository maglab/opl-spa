import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const initialValues = {
  full_text: "",
  references: [], // {type, value, data}. Typoe and value come from inputs, data is obtained via api call.,
  alias: "",
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
  full_text: Yup.string().required("Post must not be empty"),
  alias: Yup.string().required("Must provide a username/alias"),
  references: Yup.array().of(referenceSchema),
});

export default function PostFormManager({ onSubmitHandler, children }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>{children}</Form>
    </Formik>
  );
}
