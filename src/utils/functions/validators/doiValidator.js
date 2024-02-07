function doiValidator(input) {
  // Regular expression to match DOI pattern
  return new Promise((resolve, reject) => {
    const doiRegex = /^(doi:|DOI:)?10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;

    // Remove this prefix if present https://doi.org/
    const strippedInput = input.replace("https://doi.org/", "");
    const isValid = doiRegex.test(strippedInput);
    if (isValid) {
      return resolve(strippedInput);
    } else {
      return reject("Incorrect DOI pattern");
    }
  });
}

export default doiValidator;
