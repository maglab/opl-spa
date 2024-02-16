import { Box, Paper, Typography } from "@mui/material";
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

const contactBoxStyles = {
  textAlign: "center",
  paddingTop: "1rem",
  paddingBottom: "1rem",
};
/**
 * Wrapper component to contain contact inputs.
 * @param {React.Component} children - Any child components.
 * @returns {React.Component}
 */
function ContactSection({ children }) {
  return (
    <Box className="py-4" sx={contactBoxStyles}>
      <Typography variant="h5">Contact Information (optional)</Typography>
      <Box className="contact-form">{children}</Box>
    </Box>
  );
}

const recaptchaBoxStyles = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};
/**
 * Separate component for RECAPTCHA section
 * @param {React.MutableRefObject} ref - useRef mutable object, to track recpatcha value.
 * @returns {React.Component}
 */
const ReCaptchaSection = forwardRef((props, ref) => {
  return (
    <Box sx={recaptchaBoxStyles}>
      <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} ref={ref} />
    </Box>
  );
});
const boxStyles = {
  width: "80%",
  paddingTop: "4rem",
};

const paperStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const formStyles = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};
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
      <Paper elevation={2} sx={paperStyles}>
        <Box sx={boxStyles}>
          {/* Not a MUI component */}
          <Form style={formStyles}>
            <TitleInput
              name="title"
              id="title"
              label="Title:"
              required={true}
              placeHolder="Required."
            />
            <InputWithFormLabelMultiline
              name="description"
              id="description"
              label="Description:"
              required={true}
            />
            <ReferenceInput
              name="references"
              id="references"
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
          </Form>
        </Box>
      </Paper>
    </Formik>
  );
}

export default OpenProblemForm;
