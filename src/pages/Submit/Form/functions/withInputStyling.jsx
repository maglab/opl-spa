import { useEffect } from "react";
import useViewWidth from "../../../../utils/hooks/useViewWidth";
import { useField } from "formik";
/**
 * Higher order function that applies the same styling on the form inputs. Also adds a label and gives responsiveness to screen widths.
 * @param {React.Component} BaseComponent - A type of form input eg text input or text area
 * @returns {React.Component}
 */
const withInputStyling = (BaseComponent) => {
  return function StyledComponent({
    id,
    name,
    type,
    label,
    placeHolder,
    paddingY,
    rows,
  }) {
    const { isMobile } = useViewWidth();
    const [field, meta] = useField(name, type);

    useEffect(() => {
      console.log(meta);
    }, [meta]);

    return (
      <div
        className={`grid py-${paddingY} items-center ${
          isMobile ? "grid-cols-1" : "grid-cols-[20%_80%]"
        } text-center font-general`}
      >
        <label htmlFor={id} className="font-semibold font-lg">
          {label}
        </label>
        <div>
          <BaseComponent
            className="text-input h-fit-content h-auto w-full rounded-md border border-slate-500 bg-bg-grey p-2"
            name={name}
            type={type && type}
            placeHolder={placeHolder}
            {...field}
            rows={rows && rows}
          />
          {meta.touched && meta.error && (
            <p className=" text-red-600">{meta.error}</p>
          )}
        </div>
      </div>
    );
  };
};

export default withInputStyling;
