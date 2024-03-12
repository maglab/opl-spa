import apiClient from "./apiClient";

const apiComments = {
  post: ({ id, postRequestData }) =>
    apiClient.post(`posts/post/${id}/comment/submit`, postRequestData),
  getAll: ({ id }) => apiClient.get(`posts/get/${id}/comments`),
};

export default apiComments;
