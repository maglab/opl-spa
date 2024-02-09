import regexTest from "./referenceRegex";
export const initialValues = {
  title: "",
  description: "",
  references: "",
  firstName: "",
  lastName: "",
  organisation: "",
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

  //No validation for names or organisation for now

  //Email - validate if entered
  if (
    values.email.trim().length > 0 &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email";
  }

  return errors;
}

export function handleSubmit(values, actions) {
  console.log(values);
}

export default formikValidation;
