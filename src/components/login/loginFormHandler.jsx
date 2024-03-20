import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginFormManager({ children }) {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      <Form>{children}</Form>
    </Formik>
  );
}

export default LoginFormManager;
