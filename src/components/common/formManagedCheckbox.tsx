import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { FieldHelperProps, useField } from "formik";
import React from "react";

interface FormManagedCheckboxProps {
  label: string;
  name: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    helpers: FieldHelperProps<any>
  ) => void;
}

function FormManagedCheckbox({
  label,
  name,
  onChange,
}: FormManagedCheckboxProps): JSX.Element {
  const [field, meta, helpers] = useField(name);
  const errorText: string = meta.error && meta.touched ? meta.error : "";

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            value={field.value}
            onChange={(e) => onChange(e, helpers)}
          />
        }
        label={label}
      />
      {meta.error && <FormHelperText> {errorText}</FormHelperText>}
    </FormControl>
  );
}

export default FormManagedCheckbox;
