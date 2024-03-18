import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const initialValues = {
  post: "",
  full_text: "",
  alias: "",
};

const validationSchema = Yup.object().shape({
  full_text: Yup.string().required("Comment must not be empty"),
  alias: Yup.string().required("Alias / username must not be empty"),
});

export default function CommentFormManager({ onSubmitHandler, children }) {
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
