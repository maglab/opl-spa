import apiClient, { apiRequest } from "./apiClient";

/**
 * Retrieves details of a specific annotation.
 * @param {Object} params - Parameters for the API request.
 * @param {string} params.annotation - The type of annotation.
 * @param {string} params.annotationId - The ID of the annotation.
 * @returns {Promise} A promise that resolves with the annotation details.
 */
const apiAnnotations = {
  getAnnotationDetails: async (params) => {
    const { annotation, annotationId } = params;
    return apiRequest(() =>
      apiClient.get(`annotations/${annotation}/${annotationId}`)
    );
  },

  /**
   * Retrieves annotations for a given problem.
   * @param {Object} params - Parameters for the API request.
   * @param {string} annotation - The type of annotation.
   * @param {string|null} id - The ID of the problem (defaults to null).
   * @param {boolean} all - Flag to retrieve all annotations (defaults to false).
   * @returns {Promise} A promise that resolves with the annotations.
   */
  getAnnotationsForProblem: async ({
    annotation = null,
    id = null,
    all,
    fields = null,
  }) => {
    const path =
      all === true
        ? `annotations/all/${id}`
        : `annotations/${annotation}/filter/by-problem:${id}`;
    const queryParams = fields ? { fields: fields.join(",") } : {};
    return apiClient.get(path, { params: queryParams });
  },

  /**
   * Retrieves problems associated with a specific annotation type.
   * @param {Object} params - Parameters for the API request.
   * @param {string} params.annotation - The type of annotation.
   * @param {string} params.annotationId - The ID of the annotation.
   * @returns {Promise} A promise that resolves with the problems.
   */
  getProblemsForAnnotation: async (params) => {
    const { annotation, annotationId } = params;
    return apiRequest(() =>
      apiClient.get(
        `annotations/${annotation}/filter/by-annotation:${annotationId}`
      )
    );
  },

  /**
   * Retrieves all entries for a given annotation type.
   * @param {Object} params - Parameters for the API request.
   * @param {string} params.annotation - The type of annotation.
   * @returns {Promise} A promise that resolves with the annotation entries.
   */
  getAnnotationEntries: async (params) => {
    const { annotation } = params;
    return apiRequest(() => apiClient.get(`annotations/${annotation}/`));
  },

  /**
   * Sends filter parameters to the API and retrieves filtered annotations.
   * @param {Object} params - Parameters for the API request.
   * @param {Object} params.filters - The filter parameters.
   * @returns {Promise} A promise that resolves with the filtered annotations.
   */
  sendFilters: async (params) => {
    const { filters } = params;
    return apiRequest(() => apiClient.post("annotations/filter", filters));
  },
};

export default apiAnnotations;
