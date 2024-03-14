import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import React from "react";

interface FormManagedTextFieldProps
  extends Omit<
    TextFieldProps,
    "error" | "helperText" | "onChange" | "onBlur" | "value"
  > {}

function FormManagedTextField({
  name,
  children,
  ...props
}: FormManagedTextFieldProps) {
  props.fullWidth = props.fullWidth ?? true;

  const [field, meta] = useField(name as string);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      error={Boolean(errorText)}
      helperText={errorText}
      name={field.name}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      {...props}
    >
      {children}
    </TextField>
  );
}

export default FormManagedTextField;
