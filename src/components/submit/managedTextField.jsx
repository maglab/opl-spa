import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

export default function ManagedTextField({
  name,
  label,
  placeholder,
  multiline,
  rows,
  required,
  select,
  size,
  children,
}) {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      fullWidth
      size={size}
      select={select}
      placeholder={placeholder}
      label={label}
      multiline={multiline}
      minRows={rows}
      required={required}
      error={Boolean(errorText)}
      helperText={errorText}
      name={field.name}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
    >
      {children}
    </TextField>
  );
}
