import { Fragment } from "react";
import TextInput from "./Inputs/TextInput";
import { useDispatch } from "react-redux";
import { formActions } from "../../../state/Question/questionFormSlice";
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

export default ContactForm;
