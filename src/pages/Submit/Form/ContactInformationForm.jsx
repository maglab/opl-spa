import { Fragment } from "react";
import TextInput from "./Inputs/Inputs";
import { useDispatch } from "react-redux";
import { formActions } from "../../../state/Question/questionFormSlice";
import useViewWidth from "../../../utils/hooks/useViewWidth";
import { useField } from "formik";
function ContactForm() {
  const dispatch = useDispatch();
  const firstNameChangeHandler = (e) => {
    dispatch(
      formActions.inputChange({ id: "firstName", value: e.target.value })
    );
  };
  const lastNameChangeHandler = (e) => {
    dispatch(
      formActions.inputChange({ id: "lastName", value: e.target.value })
    );
  };
  return (
    <Fragment>
      <h1 className="p-8 text-lg font-bold md:text-xl">
        Contact Information (optional)
      </h1>
      <div className="Names flex w-full flex-row">
        <div className="label-name inline-block w-1/6 pt-4 text-center">
          <label htmlFor="f-name l-name">
            <p className="inline-block text-sm font-bold md:text-base">Name:</p>
          </label>
        </div>
        <div className="last-name flex w-4/5 flex-row justify-evenly">
          <input
            type="text"
            id="firstName"
            className="mr-2 w-full rounded border border-slate-500 bg-bg-grey p-2"
            placeholder="First name"
            onChange={firstNameChangeHandler}
          />
          <input
            type="text"
            id="firstName"
            className="ml-2 w-full rounded border border-slate-500 bg-bg-grey p-2"
            placeholder="Last name"
            onChange={lastNameChangeHandler}
          />
        </div>
      </div>
      <TextInput
        id="organisation"
        label="Organisation:"
        labelText="Organisation:"
      />
      <TextInput
        id="email"
        label="Please provide your email if you would like to recieve notifications"
        labelText="Email:"
      />
    </Fragment>
  );
}

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

export default ContactForm;
