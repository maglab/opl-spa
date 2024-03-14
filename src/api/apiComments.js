import apiClient from "./apiClient";

const apiComments = {
  post: ({ id, postRequestData }) =>
    apiClient.post(`posts/post/${id}/comment/submit`, postRequestData),
  getAll: ({ id, params }) =>
    apiClient.get(`posts/get/${id}/comments`, { params }),
};

export default apiComments;
