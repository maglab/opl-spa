import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const initialValues = {
  subject: 1,
  detail: "",
};

const validationSchema = Yup.object().shape({
  subject: Yup.number().required("This field is required"),
  detail: Yup.string().required("This is a required field"),
});

function ReportFormManager({ children, onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>{children}</Form>
    </Formik>
  );
}

export default ReportFormManager;
