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
};

export const getProblemsForAnnotation = async ({ annotation, annotationId }) =>
  apiClient.get(
    `annotations/${annotation}/filter/by-annotation:${annotationId}`
  );

export const getAnnotationEntries = async ({ annotation }) =>
  apiClient.get(`annotations/${annotation}/`);

export const sendFilters = async ({ filters }) =>
  apiClient.post("annotations/filter", filters);
