import emptyTextValidator from "../../../utils/functions/validators/emptyTextValidator";
import doiValidator from "../../../utils/functions/validators/doiValidator";
import pubmedValidator from "../../../utils/functions/validators/pubmedIDValidator";

async function checkReferenceLength(references) {
  return new Promise((resolve, reject) => {
    if (references.length > 0) {
      return resolve(references);
    }
    return reject(new Error("At least one reference is required."));
  });
}

async function validateReference(ref) {
  if (ref.type === "DOI") {
    await doiValidator(ref.ref);
  } else if (ref.type === "PMID") {
    await pubmedValidator(ref.ref);
  } else {
    return Promise.reject(new Error(`Invalid reference format for ${ref.ref}`));
  }
}

async function validation(data) {
  const text = data.description;
  const { references } = data;
  const errors = [];

  try {
    await emptyTextValidator(text);

    // Check for at least one reference
    await checkReferenceLength(references);

    // Validate each reference individually
    const referenceValidationPromises = references.map((ref) =>
      validateReference(ref),
    );

    // Wait for all reference validations to complete
    const referenceValidationResults = await Promise.all(
      referenceValidationPromises,
    );

    // Collect individual errors from reference validations
    errors.push(
      ...referenceValidationResults.filter((result) => result instanceof Error),
    );
  } catch (error) {
    errors.push(error);
  }

  return errors;
}

export default validation;
