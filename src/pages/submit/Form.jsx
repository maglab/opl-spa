import { Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import { React, forwardRef, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

import { RECAPTCHA_SITE_KEY } from "../../config";
import formikValidation, {
  handleSubmit,
  initialValues,
} from "./functions/formik";
import { SelectReference, TextInput, TitleInput } from "./textInputs";

// Open problem information section of form
function OpenProblemSection() {
  return (
    <>
      <Typography variant="h5" textAlign="center">
        Open Problem
      </Typography>
      <TitleInput name="title" type="text" />
      <TextInput
        id="description"
        name="description"
        label="Description"
        required
        multiline
        rows={3}
      />
      <FieldArray name="references">
        {({ push, remove, form }) => (
          <SelectReference push={push} remove={remove} form={form} />
        )}
      </FieldArray>
    </>
  );
}

// Contact section of form
function ContactSection() {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5" textAlign="center">
          Contact Information (optional)
        </Typography>
      </Grid>
      <Grid container item direction="row" spacing={2}>
        <Grid item xs={6}>
          <TextInput id="first-name" name="first_name" label="First name" />
        </Grid>
        <Grid item xs={6}>
          <TextInput id="last-name" name="last_name" label="Last name" />
        </Grid>
      </Grid>
      <Grid item>
        <TextInput id="organisation" name="organisation" label="Organisation" />
      </Grid>
      <Grid item>
        <TextInput id="job-field" name="job_field" label="Job Field" />
      </Grid>
      <Grid item>
        <TextInput id="email" name="email" label="Email" type="email" />
      </Grid>
    </Grid>
  );
}

function ButtonSection() {
  const navigate = useNavigate();

  const exitOnClickHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Button
        onClick={exitOnClickHandler}
        variant="outlined"
        color="primary"
        size="large"
      >
        Exit
      </Button>
      <Button type="submit" color="primary" variant="contained" size="large">
        Submit
      </Button>
    </Stack>
  );
}

/**
 * Separate component for RECAPTCHA section
 * @param {React.MutableRefObject} ref - useRef mutable object, to track recpatcha value.
 * @returns {React.Component}
 */
const ReCaptchaSection = forwardRef((props, ref) => (
  <Stack width="100%" justifyContent="center" alignItems="center">
    <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} ref={ref} />
  </Stack>
));

const paperStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

/**
 * Main component for open problems form.
 * @param {Function} setModalOpen setState function to open modal after submission.
 * @returns
 */
function OpenProblemForm({ setModalOpen, setModalContent }) {
  // Use formik requires initial values and validation functions
  // Will have to manually track for Recaptcha using ref
  const catpchaRef = useRef(null);
  return (
    <Formik
      initialValues={initialValues}
      validate={formikValidation}
      onSubmit={(values, actions) =>
        handleSubmit(values, actions, catpchaRef, setModalOpen, setModalContent)
      }
    >
      <Paper elevation={2} sx={paperStyles}>
        {/* Not a MUI component */}
        <Form style={{ width: "100%" }}>
          <Stack
            gap={2}
            padding={2}
            divider={<Divider orientation="horizontal" />}
          >
            <OpenProblemSection />
            <ContactSection />
            <ReCaptchaSection ref={catpchaRef} />
            <ButtonSection />
          </Stack>
        </Form>
      </Paper>
    </Formik>
  );
}

export default OpenProblemForm;
