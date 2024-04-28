import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

function PasswordTextField({ name, label, placeholder }) {
  const [field, meta] = useField(name);
  const errorText = meta.touched && meta.error ? meta.error : "";
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      label={label}
      required
      error={Boolean(errorText)}
      helperText={errorText}
      name={field.name}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      type="password"
    />
  );
}

export default PasswordTextField;
