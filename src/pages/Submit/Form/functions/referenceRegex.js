/**
 * Regex test for DOI and PMID strings.
 * @param {String} inputValue - PMID or DOI string.
 * @returns {Boolean} True or false depending whether regex test passed.
 */
function regexTest(inputValue) {
  const doiRegex =
    /^(doi:|DOI:)(https:\/\/doi.org\/)?10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
  const pubmedIDPattern = /^(pmid:|PMID:)\d+$/;
  return doiRegex.test(inputValue) || pubmedIDPattern.test(inputValue);
}

export default regexTest;
