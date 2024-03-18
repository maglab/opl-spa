import apiClient from "./apiClient";

const apiComments = {
  post: ({ id, data }) => apiClient.post(`posts/${id}/comments`, data),
  getAll: ({ id, params }) => apiClient.get(`posts/${id}/comments`, { params }),
};

export default apiComments;
