import { Formik, Form } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { initialValues, handleSubmit } from "./functions/formik";
import formikValidation from "./functions/formik";
import { TextArea, TextInput } from "./Inputs/Inputs";
import TitleInput from "./Inputs/TitleInput";
import ReferenceInput from "./Inputs/ReferenceInput";
import { NameInput } from "./Inputs/NameInput";
import { RECAPTCHA_SITE_KEY } from "../../../config";
import FilledButton from "../../../components/UI/Buttons/FilledButton";
import OutlinedButton from "../../../components/UI/Buttons/OutlineButton";
/**
 * Wrapper component to contain contact inputs.
 * @param {React.Component} children - Any child components.
 * @returns {React.Component}
 */
function ContactSection({ children }) {
  return (
    <div className="py-4">
      <h1 className="font-general font-semibold text-xl w-full text-center py-4 ">
        Contact Information (optional)
      </h1>
      <div className="contact-form">{children}</div>
    </div>
  );
}

/**
 * Separate component for RECAPTCHA section
 * @param {React.MutableRefObject} ref - useRef mutable object, to track recpatcha value.
 * @returns {React.Component}
 */
function ReCaptchaSection({ ref }) {
  return (
    <div className="RECAPTCHA w-full flex justify-center">
      <ReCAPTCHA
        className="recaptcha py-4"
        sitekey={RECAPTCHA_SITE_KEY}
        ref={ref}
      />
    </div>
  );
}

function OpenProblemForm() {
  const navigate = useNavigate();
  //Use formik requires initial values and validation functions
  // Will have to manually track for Recaptcha using ref
  const ref = useRef(null);
  const exitOnclick = (event) => {
    event.preventDefault(); //Prevent the submit
    navigate(-1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={formikValidation}
      onSubmit={handleSubmit}
    >
      <Form className="bg-white p-6 py-14 shadow-md">
        <TitleInput
          name="title"
          id="title"
          label="Title:"
          placeHolder="Required."
          paddingY={4}
        />
        <TextArea
          name="description"
          id="description"
          label="Description:"
          placeHolder="Required."
        />
        <ReferenceInput
          name="references"
          id="references"
          label="References (comma separated DOI or PMID):"
          placeHolder="Example: PMID:12345678, DOI:10.1016/j.cell.2022.11.001"
          required={true}
        />
        <hr />
        <ContactSection>
          <NameInput paddingY={4} />
          <TextInput
            name="organisation"
            type="text"
            id="organisation"
            label="Organisation:"
          />
          <TextInput
            name="email"
            type="email"
            id="email"
            label="Email:"
            placeHolder="Provide an email if you want to be updated on the status of this submission."
          />
        </ContactSection>
        <hr className="py-4" />
        <ReCaptchaSection />
        <div className="buttons flex flex-row justify-center gap-x-6 py-4">
          <OutlinedButton label="Exit" onClick={exitOnclick} type="button" />
          <FilledButton label="Submit" type="submit" />
        </div>
      </Form>
    </Formik>
  );
}

export default OpenProblemForm;

// Track change with formik.handleChange
// Track touched with formik.handleBlur
// Track values with formik.values.ValueKey
// Reduce boilerplate with formik.getFieldProps
