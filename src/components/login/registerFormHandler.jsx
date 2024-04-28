import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
  confirm_passwprd: "",
  first_name: "",
  last_name: "",
  affiliation: "",
  role: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least one uppercase letter and one number"
    )
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  affiliation: Yup.string(),
  job_role: Yup.string(),
});

function RegisterFormManager({ children }) {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      <Form>{children}</Form>
    </Formik>
  );
}

export default RegisterFormManager;
