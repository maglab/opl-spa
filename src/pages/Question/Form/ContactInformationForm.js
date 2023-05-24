import { Fragment } from "react";
import TextInput from "./Inputs/TextInput";
function ContactForm() {
  return (
    <Fragment>
      <h1 className="p-8 text-lg font-bold md:text-xl">
        Contact Information (optional)
      </h1>
      <div className="Names flex w-full flex-row">
        <div className="label-name inline-block w-1/5 pt-4 text-center">
          <label htmlFor="f-name l-name">
            <p className="inline-block text-sm font-bold md:text-base">Name:</p>
          </label>
        </div>
        <div className="last-name flex w-4/5 flex-row justify-evenly">
          <input
            type="text"
            id="f-name"
            className="mr-2 w-full rounded border border-slate-500 bg-bg-grey p-2"
            placeholder="First name"
          />
          <input
            type="text"
            id="f-name"
            className="ml-2 w-full rounded border border-slate-500 bg-bg-grey p-2"
            placeholder="Last name"
          />
        </div>
      </div>
      <TextInput id="email" label="" labelText="Email:" />
      <TextInput id="affiliation" label="" labelText="Affiliation:" />
    </Fragment>
  );
}

export default ContactForm;
