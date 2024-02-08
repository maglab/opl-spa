import useViewWidth from "../../../../utils/hooks/useViewWidth";
import { useField } from "formik";

/**
 * Custom formik input for first name and last name.
 * @param {String} classNames - Additional classnames for tailwind css styling. Mainly for setting margin and padding.
 * @returns {React.Component}
 */

export function NameInput({ paddingY }) {
  const { isMobile } = useViewWidth();
  const [fieldFirst, metaFirst] = useField("firstName", "text");
  const [fieldLast, metaLast] = useField("lastName", "text");

  return (
    <fieldset
      className={`w-full grid items-center py-${paddingY} ${
        isMobile ? "grid-cols-1" : "grid-cols-[20%_80%]"
      }`}
    >
      <label className="text-center font-semibold">Name</label>
      <div className="flex flex-row gap-x-4 ">
        <input
          {...fieldFirst}
          name="firstName"
          type="text"
          className="text-input h-fit-content h-auto w-full rounded-md border border-slate-500 bg-bg-grey p-2"
          placeholder="First name"
        />
        <input
          {...fieldLast}
          name="lastName"
          type="text"
          className="text-input h-fit-content h-auto w-full rounded-md border border-slate-500 bg-bg-grey p-2"
          placeholder="Last name"
        />
      </div>
      {metaFirst.touched && metaFirst.error && <div>{metaLast.error}</div>}
      {metaLast.touched && metaLast.error && <div>{metaLast.error}</div>}
    </fieldset>
  );
}

export default NameInput;
