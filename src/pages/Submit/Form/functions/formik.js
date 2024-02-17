import apiProblems from "../../../../api/apiProblems";
import regexTest from "./referenceRegex";

// Formik initial values for the form
export const initialValues = {
  title: "",
  description: "",
  references: "",
  first_name: "",
  last_name: "",
  organisation: "",
  job_field: "",
  email: "",
};

// Formik validation function
function formikValidation(values) {
  const errors = {};
  //Title validation
  if (!values.title.trim()) {
    errors.title = "Title required";
  }
  //Description validation
  if (!values.description.trim()) {
    errors.description = "Description is required";
  }
  //References validation
  const references = values.references
    .trim("")
    .split(/\s*,\s*/)
    .filter(Boolean);
  const results = references.map((reference) => regexTest(reference));
  if (results.includes(false)) {
    errors.references = "Cannot submit. Incorrect PMID or DOI formats.";
  }

  //Names - Need both first name and last name not either or
  if (values.first_name) {
    if (!values.last_name) {
      errors.lastName = "Last name must be filled if first name is filled.";
    }
    if (values.first_name.length > 50) {
      errors.first_name = "First name must be fewer than 50 characters.";
    }
  }
  if (values.last_name) {
    if (!values.first_name) {
      errors.first_name = "First name must be filled if last name is filled.";
    }
    if (values.last_name.length > 50) {
      errors.last_name = "Last name must be fewer than 50 characters.";
    }
  }

  //Email - validate if entered
  if (
    values.email.trim().length > 0 &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email";
  }

  return errors;
}

// Helper function - update modal content
function updateModal(setModalOpen, setModalContent, title, response) {
  setModalOpen(true);
  setModalContent({ title, response });
}

// Helper function - token verification
async function verifyRecaptchaToken(ref) {
  const token = ref.current.getValue();
  ref.current.reset(); // Reset the recaptcha after obtaining the token
  const response = await apiProblems.verifyToken({ token });
  return JSON.parse(response.data);
}

// Helpfer function - form submission
async function submitForm(values, actions, setModalOpen, setModalContent) {
  const response = await apiProblems.postProblem({ data: values });
  if (response.status === 201) {
    updateModal(
      setModalOpen,
      setModalContent,
      "Successful",
      "Your submission is under review."
    );
    actions.resetForm();
  } else {
    // Handle unsuccessful submission, could also check for other status codes
    updateModal(
      setModalOpen,
      setModalContent,
      "Unsuccessful",
      "Unable to submit open problem"
    );
  }
  actions.setSubmitting(false);
}

/**
 * Submit function used by formik
 * @param {Object} values - formik object containing all values from form
 * @param {Object} actions - formik object containing action methods.
 * @param {Object} ref - ref object referncing the recatpcha component
 * @param {Function} setModalOpen - Set state function for opening modal
 * @param {Function} setModalContent - Set state function for setting modal content
 */
export async function handleSubmit(
  values,
  actions,
  ref,
  setModalOpen,
  setModalContent
) {
  try {
    const recaptchaResponse = await verifyRecaptchaToken(ref);
    if (recaptchaResponse.success) {
      await submitForm(values, actions, setModalOpen, setModalContent);
    } else {
      updateModal(
        setModalOpen,
        setModalContent,
        "Unsuccessful",
        "Please complete recaptcha."
      );
    }
  } catch (error) {
    updateModal(
      setModalOpen,
      setModalContent,
      "Unsuccessful",
      `Submission error: ${error}`
    );
  }
}

export default formikValidation;
