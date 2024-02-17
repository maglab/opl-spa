import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { forwardRef, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

import { InputWithFormLabelMultiline } from "../../../components/UI/Inputs/TextArea";
import { InputWithFormLabel } from "../../../components/UI/Inputs/TextInput";
import { RECAPTCHA_SITE_KEY } from "../../../config";
import NameInput from "./Inputs/NameInput";
import ReferenceInput from "./Inputs/ReferenceInput";
import { TitleInput } from "./Inputs/TitleInput";
import formikValidation, {
  handleSubmit,
  initialValues,
} from "./functions/formik";

/**
 * Wrapper component to contain contact inputs.
 * @param {React.Component} children - Any child components.
 * @returns {React.Component}
 */
function ContactSection({ children }) {
  return (
    <Box paddingBottom="1.5rem">
      <Typography variant="h5" textAlign="center" paddingBottom="2rem">
        Contact Information (optional)
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {children}
      </Box>
    </Box>
  );
}

/**
 * Separate component for RECAPTCHA section
 * @param {React.MutableRefObject} ref - useRef mutable object, to track recpatcha value.
 * @returns {React.Component}
 */
const ReCaptchaSection = forwardRef((props, ref) => {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} ref={ref} />
    </Box>
  );
});

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
const buttonBoxStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "24px",
  paddingBottom: "16px",
};
/**
 * Main component for open problems form.
 * @param {Function} setModalOpen setState function to open modal after submission.
 * @returns
 */
function OpenProblemForm({ setModalOpen }) {
  const navigate = useNavigate();
  //Use formik requires initial values and validation functions
  // Will have to manually track for Recaptcha using ref
  const catpchaRef = useRef(null);
  const exitOnclick = (event) => {
    event.preventDefault(); //Prevent the submit
    navigate(-1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={formikValidation}
      onSubmit={(values, actions) =>
        handleSubmit(values, actions, catpchaRef, setModalOpen)
      }
    >
      <Paper elevation={2} sx={paperStyles}>
        <Box width="80%" paddingTop="4rem">
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
            <Divider aria-hidden={true} />
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
            <Divider aria-hidden={true} />
            <ReCaptchaSection ref={catpchaRef} />
            <Box className="button-box" {...buttonBoxStyles}>
              <Button
                variant="outlined"
                onClick={exitOnclick}
                size="medium"
                color="secondary"
              >
                Exit
              </Button>
              <Button
                variant="contained"
                type="submit"
                size="medium"
                color="secondary"
              >
                Submit
              </Button>
            </Box>
          </Form>
        </Box>
      </Paper>
    </Formik>
  );
}

export default OpenProblemForm;
