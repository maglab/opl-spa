import { useField } from "formik";

import useViewWidth from "../../../../utils/hooks/useViewWidth";

/**
 * Wrapper component to style inputs and apply labels for the form.
 * @param {React.Component} children - Child components to be wrapped
 * @param {String} - label - Label text for input
 * @param {id} - label id for input
 * @param {Object} - Meta object supplied by formik useField hook.
 * @param {Number} paddingY - Padding for the div.
 * @returns {React.Component}
 */
function InputStyling({ children, label, id, meta, paddingY }) {
  const { isMobile } = useViewWidth();
  return (
    <div
      className={`grid items-center py-${paddingY} ${
        isMobile ? "grid-cols-1" : "grid-cols-[20%_80%]"
      } text-center font-general`}
    >
      <label htmlFor={id} className="font-semibold font-lg">
        {label}
      </label>
      <div>
        {children}
        {meta.touched && meta.error && (
          <p className=" text-red-600">{meta.error}</p>
        )}
      </div>
    </div>
  );
}

/**
 * Styled input made for open problem submission form.
 * @param {String} name - Name to identify input. Required for formik.
 * @param {String} type - Sets the type of the input
 * @param {String} classNames - Additional class names for tailwindcss styling
 * @param {String} id - Label ID
 * @param {String} label - Label text
 * @param {String} placeholder - Placeholder text.
 * @param {Number} paddingY - Padding for the div.
 * @returns {React.Component}
 */
function TextInput({
  name,
  type,
  classNames,
  id,
  label,
  placeholder,
  required,
  paddingY,
}) {
  const [field, meta] = useField(name, type && type);
  return (
    <InputStyling
      id={id}
      name={name}
      label={label}
      type={type}
      meta={meta}
      paddingY={paddingY}
    >
      <input
        name={name}
        type={type}
        className={`text-input h-fit-content h-auto w-full rounded-md border border-slate-500 bg-bg-grey p-2 ${classNames}`}
        {...field}
        meta={meta}
        placeholder={placeholder}
        required={required}
      />
    </InputStyling>
  );
}

/**
 * Styled textarea made for open problem submission form.
 * @param {String} name - Name to identify input. Required for formik.
 * @param {String} classNames - Additional class names for tailwindcss styling
 * @param {String} id - Label ID
 * @param {String} label - Label text
 * @param {String} placeholder
 * @param {Boolean} required - HTML required input.
 * @param {Number} paddingY - Padding or outside the input.
 * @returns {React.Component}
 */
function TextArea({
  name,
  classNames,
  id,
  label,
  placeholder,
  required,
  paddingY,
}) {
  const [field, meta] = useField(name);
  return (
    <InputStyling
      id={id}
      name={name}
      meta={meta}
      label={label}
      paddingY={paddingY}
    >
      <textarea
        className={`text-input h-fit-content h-auto w-full rounded-md border border-slate-500 bg-bg-grey p-2 ${classNames}`}
        {...field}
        placeholder={placeholder}
        required={required}
      />
    </InputStyling>
  );
}

export { TextArea, TextInput };
