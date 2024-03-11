import { Box, FilledInput, FormHelperText, FormLabel } from "@mui/material";
import { useField } from "formik";
import withOnChangeHandler from "../../../utils/hoc/withOnChangeHandler";

const boxStyles = {
  alignItems: "center",
};

const labelStyles = {
  fontSize: 18,
};

/**
 * Re-useable MUI text area with form label.
 * @param {String} id - ID for input
 * @param {String} label - Label text
 * @param {String} name - Required for formik
 * @param {Boolean} required - Required boolean for input
 * @param {String} placeHolder - Placeholder text
 * @returns {React.Component}
 */
export function InputWithFormLabelMultiline({
  id,
  label,
  name,
  required,
  placeHolder,
}) {
  const [field, meta] = useField(name, "textarea");

  return (
    <Box sx={boxStyles}>
      <FormLabel sx={labelStyles}>{label}</FormLabel>
      <FilledInput
        id={id}
        fullWidth
        name={name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={meta.touched && Boolean(meta.error)}
        required={required}
        multiline={true}
        minRows={3}
        placeholder={placeHolder}
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
