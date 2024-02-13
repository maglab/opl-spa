/**
 *
 * @param {Object[]} data - An array of data objects that may or may not contain a parent attribute to determine whether the data is hierarchical or not.
 * @returns {boolean}
 */
function hierarchicalValidator(data) {
  // For now we can use a simple check to find if the data array objects contains the attribute data
  const hierarchical = data.some(
    (item) => item.hasOwnProperty("parent") === true,
  );
  return hierarchical;
}

export default hierarchicalValidator;
