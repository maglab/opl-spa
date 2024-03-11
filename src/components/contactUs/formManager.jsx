import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const initialValues = {
  first_name: "",
  last_name: "",
  organisation: "",
  position: "",
  email: "",
  subject: "",
  message: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email address"),
  subject: Yup.string().required("Subject is required"),
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
