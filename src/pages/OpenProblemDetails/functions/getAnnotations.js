import apiAnnotations from "../../../api/apiAnnotations";

async function getAnnotations(annotationArr, problemId) {
  /**
   * This function retrieves all annotations for an open problem
   * @param {array} annotationArr - An array of strings that sets the route for the request.
   * @param {number} problemId - Integer that is the primary key of the open problem. Also sets the route for the request
   * * */
  const annotationArray = [];
  for (const annotation of annotationArr) {
    const params = { annotation, problemId };
    try {
      const response = await apiAnnotations.getAnnotationsForProblem(params);
      const { status, data } = response;
      const annotationData = { annotation, status, data };
      annotationArray.push(annotationData);
    } catch (error) {
      annotationArray.push(error);
    }
  }
  return annotationArray;
}

export default getAnnotations;
