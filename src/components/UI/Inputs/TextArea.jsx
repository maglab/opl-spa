import { Box, FilledInput, FormHelperText, FormLabel } from "@mui/material";
import { useField } from "formik";
import withOnChangeHandler from "../../../utils/hoc/withOnChangeHandler";

const boxStyles = {
  alignItems: "center",
  paddingTop: "2rem",
  paddingBottom: "2rem",
};

const labelStyles = {
  fontSize: 18,
};
export function InputWithFormLabelMultiline({
  label,
  onChange,
  onBlur,
  error,
  name,
  required,
}) {
  const [field, meta] = useField(name, "textarea");

  return (
    <Box sx={boxStyles}>
      <FormLabel sx={labelStyles}>{label}</FormLabel>
      <FilledInput
        fullWidth
        name={name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={meta.error}
        required={required}
        multiline={true}
        minRows={3}
      />
      <FormHelperText>{meta.error}</FormHelperText>
    </Box>
  );
}

function textArea(props) {
  return (
    <textarea
      className={props.className}
      placeholder={props.placeHolder}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export function TextAreaNoChangeHandler({
  className,
  placeHolder,
  onChange,
  value,
}) {
  return (
    <textarea
      className={className}
      placeholder={placeHolder}
      onChange={onChange}
      value={value}
    />
  );
}

const TextAreaChangeHandler = withOnChangeHandler(textArea);
export default TextAreaChangeHandler;
