import apiClient from "./apiClient";

const apiComments = {
  post: ({ id, postType, data }) =>
    apiClient.post(`posts/${id}/${postType}/comments`, {
      ...data,
      is_active: true,
    }), // For now comments are straight away active.
  get: ({ postType, id }) => apiClient.get(`posts/${postType}/comments/${id}`),
  getAll: ({ id, postType, params }) =>
    apiClient.get(`posts/${id}/${postType}/comments`, { params }),
};

export default apiComments;
