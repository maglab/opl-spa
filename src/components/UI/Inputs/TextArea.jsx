import withOnChangeHandler from "../../../utils/hoc/withOnChangeHandler";

function textArea(props) {
  return (
    <textarea
      className={props.className}
      placeholder={props.placeHolder}
      value={props.value}
      onChange={props.onChange}
    ></textarea>
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
    ></textarea>
  );
}

const TextAreaChangeHandler = withOnChangeHandler(textArea);
export default TextAreaChangeHandler;
