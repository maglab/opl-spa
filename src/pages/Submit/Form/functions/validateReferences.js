import doiValidator from "../../../../utils/functions/validators/doiValidator";
import pubmedValidator from "../../../../utils/functions/validators/pubmedIDValidator";

/**
 * Helper function. Validates an array of references to be sent to API.
 * @param {Array[String]} references - Array of DOI/PMID values for references.
 * @returns {{Array, Array}} - Object containing an array of valid DOI/PMIDs and invalid.
 */
async function validateReferences(references) {
  const valid = [];
  const invalid = [];
  for (const reference of references) {
    const index = reference.indexOf(":");
    const referenceType = reference.substring(0, index);
    const referenceValue = reference.substring(index + 1);
    if (referenceType === "doi") {
      try {
        const validDOI = await doiValidator(referenceValue);
        if (validDOI) {
          valid.push(reference);
        }
      } catch (error) {
        invalid.push(reference);
      }
    } else if (referenceType === "pmid") {
      try {
        const validPMID = await pubmedValidator(referenceValue);
        if (validPMID) {
          valid.push(reference);
        }
      } catch (error) {
        invalid.push(reference);
      }
    }
  }
  return { valid, invalid };
}

export default validateReferences;
