function pubmedValidator(input) {
  // Regular expression to match PubMed ID pattern (numeric value)
  return new Promise((resolve, reject) => {
    const pubmedIDPattern = /^(pmid:|PMID:)?\d+$/;
    const isValid = pubmedIDPattern.test(input);
    //If starts with 0 then reject;
    if (input.startsWith("0")) {
      return reject("Incorrect pubmed pattern");
    }
    if (isValid) {
      return resolve(input);
    } else {
      return reject("Incorrect pubmed pattern");
    }
  });
}

export default pubmedValidator;
