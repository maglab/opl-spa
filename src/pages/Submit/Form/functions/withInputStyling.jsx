import useViewWidth from "../../../../utils/hooks/useViewWidth";
import { useField } from "formik";
/**
 * Higher order function that applies the same styling on the form inputs. Also adds a label and gives responsiveness to screen widths.
 * @param {React.Component} BaseComponent - A type of form input eg text input or text area
 * @returns {React.Component}
 */
const withInputStyling = (BaseComponent) => {
  return function StyledComponent({ id, name, type, label, placeHolder }) {
    const { isMobile } = useViewWidth();
    const [field, meta] = useField(name, type);

    return (
      <div
        className={`grid py-6 items-center ${
          isMobile ? "grid-cols-1" : "grid-cols-[20%_80%]"
        } text-center font-general`}
      >
        <label htmlFor={id} className="font-semibold font-lg">
          {label}
        </label>
        <BaseComponent
          className="text-input h-fit-content h-auto w-full rounded-border border border-slate-500 bg-bg-grey p-2"
          name={name}
          type={type}
          placeHolder={placeHolder}
          {...field}
        />
        {meta.touched && meta.error && <div>{meta.error}</div>}
      </div>
    );
  };
};

export default withInputStyling;
