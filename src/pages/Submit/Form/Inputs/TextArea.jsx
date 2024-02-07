import { useField } from "formik";

export function TextArea({ id, name, type, label, placeHolder }) {
  const [field, meta] = useField(name, type);
  const { isMobile } = useViewWidth();
  return (
    <div
      className={`grid ${
        isMobile ? "grid-cols-1" : "grid-cols-2"
      } font-general`}
    >
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <textarea {...field} name={name} type={type} placeholder={placeHolder} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  );
}

export default TextArea;
