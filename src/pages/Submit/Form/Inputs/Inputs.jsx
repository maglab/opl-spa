import withInputStyling from "../functions/withInputStyling";

//General input components to be used with the HOC.

function InputComponent({
  id,
  name,
  type,
  placeHolder,
  field,
  className,
  required,
  paddingY,
}) {
  return (
    <input
      className={className}
      id={id}
      name={name}
      type={type}
      placeholder={placeHolder}
      {...field}
      required={required}
      paddingY={paddingY}
    />
  );
}

function TextAreaComponent({
  id,
  name,
  type,
  placeHolder,
  field,
  className,
  required,
  rows,
  paddingY,
}) {
  return (
    <textarea
      className={className}
      id={id}
      name={name}
      type={type}
      placeholder={placeHolder}
      {...field}
      required={required}
      rows={rows}
      paddingY={paddingY}
    />
  );
}

export const TextInput = withInputStyling(InputComponent);
export const TextArea = withInputStyling(TextAreaComponent);

export default TextInput;
