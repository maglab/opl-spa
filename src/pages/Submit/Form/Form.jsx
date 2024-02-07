import { Formik, Field, Form, ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

import { initialValues } from "./functions/formik";
import formikValidation from "./functions/formik";
import { TextInput2, TextArea2 } from "./Inputs/Inputs";
import TitleInput from "./Inputs/TitleInput";
import ReferenceInput from "./Inputs/ReferenceInput";
import { NameInput } from "./ContactInformationForm";
import { RECAPTCHA_SITE_KEY } from "../../../config";

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
  //Use formik requires initial values and validation functions
  // Will have to manually track for Recaptcha using ref
  const ref = useRef(null);

  return (
    <Formik initialValues={initialValues} validate={formikValidation}>
      <Form className="bg-white p-6 py-10 shadow-md">
        <TitleInput
          name="title"
          id="title"
          label="Title:"
          placeHolder="Required."
          paddingY={4}
        />
        <TextArea2
          name="description"
          id="description"
          label="Description:"
          type="textarea"
          placeHolder="Required."
          required={true}
          rows={4}
          paddingY={4}
        />
        <ReferenceInput
          name="references"
          id="references"
          label="References:"
          placeHolder="Required."
          required={true}
          type="textarea"
        />
        <hr />
        <ContactSection>
          <NameInput paddingY={4} />
          <TextInput2
            name="organisation"
            type="text"
            id="organisation"
            label="Organisation:"
            paddingY={4}
          />
          <TextInput2
            name="email"
            type="email"
            id="email"
            label="Email:"
            placeHolder="Provide an email if you want to be updated on the status of this submission."
            paddingY={4}
          />
        </ContactSection>
        <hr className="py-4" />
        <ReCaptchaSection />
      </Form>
    </Formik>
  );
}

export default OpenProblemForm;

// Track change with formik.handleChange
// Track touched with formik.handleBlur
// Track values with formik.values.ValueKey
// Reduce boilerplate with formik.getFieldProps
