import { Box, FilledInput, FormHelperText, FormLabel } from "@mui/material";
import { useField } from "formik";
import { useState } from "react";
import withOnChangeHandler from "../../../utils/hoc/withOnChangeHandler";

const boxStyles = {
  // alignItems: "center",
  width: "100%",
};

const labelStyles = {
  fontSize: 18,
};

const inputStyles = {
  width: "80%",
};

/**
 * Re-useable MUI text input with form label.
 * @param {String} id - ID for input
 * @param {String} label - Label text
 * @param {String} name - Required for formik
 * @param {Boolean} required - Required boolean for input
 * @param {String} placeHolder - Placeholder text
 * @param {String} type - Input type. Default is text.
 * @returns {React.Component}
 */
export function InputWithFormLabel({
  id,
  label,
  name,
  required,
  placeHolder,
  type = "text",
}) {
  const [field, meta] = useField(name, "input");

  return (
    <Box sx={boxStyles}>
      <FormLabel sx={labelStyles}>{label}</FormLabel>
      <FilledInput
        id={id}
        fullWidth={true}
        name={name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={meta.touched && Boolean(meta.error)}
        required={required}
        placeholder={placeHolder}
        type={type}
      />
      <FormHelperText>{meta.error}</FormHelperText>
    </Box>
  );
}

function textInput(props) {
  return (
    <input
      type="text"
      onChange={props.onChange}
      className={props.className}
      placeholder={props.placeHolder}
      value={props.value}
    />
  );
}

const TextInput = withOnChangeHandler(textInput);

export function TextInputStyled({
  label,
  type = "text",
  value,
  onChangeHandler,
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value;

  const onChange = (e) => {
    const string = e.target.value;
    if (string.trim().length > 0) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
    onChangeHandler();
  };

  const onBlur = (e) => {
    const string = e.target.value;
    if (string.trim().length > 0) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  };

  return (
    <div className="relative w-full py-1">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={onBlur}
        className={`w-full px-4 py-2 bg-gray-300 bg-opacity-30 shadow border-b rounded-t-md outline-none transition-all duration-300 ${
          isActive ? "pt-4" : ""
        } ${
          isFocused ? "border-indigo-500 shadow-theme-blue" : "border-gray-300"
        } `}
        {...rest}
      />
      {label && (
        <label
          className={`absolute left-3 bg-inherit transition-all duration-300 pointer-events-none  px-1 ${
            isActive
              ? "top-1 text-xs text-indigo-500"
              : "top-5 text-sm text-gray-500"
          }`}
          style={{ transformOrigin: "0 0" }}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export default TextInput;
