import apiClient from "./apiClient";

export const getAnnotationDetails = async ({ annotation, annotationId }) =>
  apiClient.get(`annotations/${annotation}/${annotationId}`);

export const getAnnotationsForProblem = async ({
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
}; // Not sure we need this anymore

export const getProblemsForAnnotation = async ({ annotation, annotationId }) =>
  apiClient.get(
    `annotations/${annotation}/filter/by-annotation:${annotationId}`
  );

export const getAnnotationEntries = async ({ annotationType }) =>
  apiClient.get(`annotations/${annotationType}/`);

export const sendFilters = async ({ filters }) =>
  apiClient.post("annotations/filter", filters);
