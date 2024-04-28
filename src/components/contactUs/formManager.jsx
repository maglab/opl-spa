import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const initialValues = {
  first_name: "",
  last_name: "",
  organisation: "",
  position: "",
  email: "",
  subject: 1,
  message: "",
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string(),
  last_name: Yup.string(),
  organisation: Yup.string(),
  position: Yup.string(),
  email: Yup.string().email("Must be a valid email address"),
  subject: Yup.number().required("Subject is required"),
  message: Yup.string().required("Message must not be empty"),
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
