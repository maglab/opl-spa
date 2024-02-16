import { Box, Button, Paper, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { forwardRef, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { InputWithFormLabelMultiline } from "../../../components/UI/Inputs/TextArea";
import { InputWithFormLabel } from "../../../components/UI/Inputs/TextInput";
import { RECAPTCHA_SITE_KEY } from "../../../config";
import NameInput from "./Inputs/NameInput";
import ReferenceInput from "./Inputs/ReferenceInput";
import TitleInput from "./Inputs/TitleInput";
import formikValidation, {
  handleSubmit,
  initialValues,
} from "./functions/formik";

const contactBoxStyles = {
  paddingBottom: "1.5rem",
};
const typographyStyles = {
  textAlign: "center",
  paddingBottom: "2rem",
};
const childrenBoxStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};
/**
 * Wrapper component to contain contact inputs.
 * @param {React.Component} children - Any child components.
 * @returns {React.Component}
 */
function ContactSection({ children }) {
  return (
    <Box sx={contactBoxStyles}>
      <Typography variant="h5" sx={typographyStyles}>
        Contact Information (optional)
      </Typography>
      <Box sx={childrenBoxStyles}>{children}</Box>
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
              <InputWithFormLabel
                id="organisation"
                name="organisation"
                label="Organisation"
              />
              <InputWithFormLabel
                id="jobField"
                name="job_field"
                label="Job Field"
              />
              <InputWithFormLabel
                id="email"
                name="email"
                label="Email"
                type="email"
              />
            </ContactSection>
            <hr className="py-4" />
            <ReCaptchaSection ref={catpchaRef} />
            <div className="buttons flex flex-row justify-center gap-x-6 py-4">
              <Button variant="outlined" onClick={exitOnclick} size="medium">
                Exit
              </Button>
              <Button variant="contained" type="submit" size="medium">
                Submit
              </Button>
            </div>
          </Form>
        </Box>
      </Paper>
    </Formik>
  );
}

export default OpenProblemForm;
