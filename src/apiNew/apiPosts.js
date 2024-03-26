import apiClient from "./apiClient";

export const forOpenProblem = ({ id, params }) =>
  apiClient.get(`posts/${id}`, params);

export const all = () => apiClient.get("posts/all");

export const submit = ({ data, problemId }) =>
  apiClient.post(`posts/${problemId}/submit`, data).catch((error) => error);
