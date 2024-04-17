import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import { merge } from "lodash";
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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...merge({ fullWidth: true }, props)}
    >
      {children}
    </TextField>
  );
}

export default FormManagedTextField;
