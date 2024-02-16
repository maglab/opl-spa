import regexTest from "./referenceRegex";
import apiProblems from "../../../../api/apiProblems";
import { generalActions } from "../../../../state/generalStateSlice";
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

export async function handleSubmit(values, actions, ref, dispatch) {
  dispatch(generalActions.toggleModal({ bool: true }));
  //Let's grab the recaptcha token
  const token = ref.current.getValue();
  ref.current.reset();
  try {
    const response = await apiProblems.verifyToken({ token: token });
    const parsedResponse = JSON.parse(response.data);
    if (parsedResponse.success) {
      //Send the form data
      const response = await apiProblems.postProblem({ values });
    } else {
    }
  } catch (error) {
    // Something
    console.log(error);
  }
}

export default formikValidation;
