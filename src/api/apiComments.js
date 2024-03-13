import apiClient from "./apiClient";

const apiComments = {
  post: ({ id, postRequestData }) =>
    apiClient.post(`posts/post/${id}/comment/submit`, postRequestData),
  getAll: ({ id, queryParams }) =>
    apiClient.get(`posts/get/${id}/comments`, { params: queryParams }),
};

export default apiComments;
