import apiClient from "./apiClient";

export const post = ({ id, postRequestData }) =>
  apiClient.post(`posts/post/${id}/comment/submit`, postRequestData);

export const getAll = ({ id }) => apiClient.get(`posts/get/${id}/comments`);
