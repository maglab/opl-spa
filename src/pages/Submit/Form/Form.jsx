import { Box, Paper } from "@mui/material";
import { Form, Formik } from "formik";
import { forwardRef, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import FilledButton from "../../../components/UI/Buttons/FilledButton";
import OutlinedButton from "../../../components/UI/Buttons/OutlineButton";
import { InputWithFormLabelMultiline } from "../../../components/UI/Inputs/TextArea";
import { RECAPTCHA_SITE_KEY } from "../../../config";
import { TextInput } from "./Inputs/Inputs";
import { NameInput } from "./Inputs/NameInput";
import ReferenceInput from "./Inputs/ReferenceInput";
import TitleInput from "./Inputs/TitleInput";
import formikValidation, {
  handleSubmit,
  initialValues,
} from "./functions/formik";

const boxStyles = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "2rem",
  paddingBottom: "2rem",
};

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
const ReCaptchaSection = forwardRef((props, ref) => {
  return (
    <div className="RECAPTCHA w-full flex justify-center">
      <ReCAPTCHA
        className="recaptcha py-4"
        sitekey={RECAPTCHA_SITE_KEY}
        ref={ref}
      />
    </div>
  );
});

function OpenProblemForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Use formik requires initial values and validation functions
  // Will have to manually track for Recaptcha using ref
  const catpchaRef = useRef("test");
  const exitOnclick = (event) => {
    event.preventDefault(); //Prevent the submit
    navigate(-1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={formikValidation}
      onSubmit={(values, actions) =>
        handleSubmit(values, actions, catpchaRef, dispatch)
      }
    >
      <Paper elevation={2}>
        <Box sx={boxStyles}>
          <Form style={{ columnGap: 12 }}>
            <div className="gap-y-4">
              <TitleInput
                name="title"
                id="title"
                label="Title:"
                required={true}
                placeHolder="Required."
                paddingY={4}
              />
              <InputWithFormLabelMultiline
                name="description"
                id="description"
                label="Description:"
                required={true}
              />
              {/* <TextArea
                name="description"
                id="description"
                label="Description:"
                placeHolder="Required."
              /> */}
              <ReferenceInput
                name="references"
                id="references"
                label="References (comma separated DOI or PMID):"
                placeHolder="Example: PMID:12345678, DOI:10.1016/j.cell.2022.11.001"
                required={true}
              />
              <hr />
              <ContactSection>
                <NameInput paddingY={2} />
                <TextInput
                  name="organisation"
                  type="text"
                  id="organisation"
                  label="Organisation:"
                  paddingY={2}
                />
                <TextInput
                  name="job_field"
                  type="text"
                  id="jobField"
                  label="Job Field:"
                  paddingY={2}
                />
                <TextInput
                  name="email"
                  type="email"
                  id="email"
                  label="Email:"
                  placeHolder="Provide an email if you want to be updated on the status of this submission."
                  paddingY={2}
                />
              </ContactSection>
              <hr className="py-4" />
              <ReCaptchaSection ref={catpchaRef} />
              <div className="buttons flex flex-row justify-center gap-x-6 py-4">
                <OutlinedButton
                  label="Exit"
                  onClick={exitOnclick}
                  type="button"
                />
                <FilledButton label="Submit" type="submit" />
              </div>
            </div>
          </Form>
        </Box>
      </Paper>
    </Formik>
  );
}

export default OpenProblemForm;
