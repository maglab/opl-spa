/**
 * @param {Object} filterObj - An object containing redux state values for filtering open problems. The Object looks like this:
 *   filters: {
    sorting: "latest",
    subject: [{title, id, etc}],
    gene: [],
    compound: [],
    species: [],
  },
 * @returns {Object} - Returns a flattened object of the annotation and an array of ids. 
 */
export default function sortQuery(filterObj) {
  let flattenedObj = {};
  for (const key in filterObj) {
    if (key === "sorting") {
      flattenedObj[key] = filterObj[key];
    } else {
      flattenedObj[key] = filterObj[key].map((item) => item.id);
    }
  }
  return flattenedObj;
}