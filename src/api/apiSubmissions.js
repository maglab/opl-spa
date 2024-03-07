import apiClient from "./apiClient";

const apiPosts = {
  forOpenProblem: ({ id }) => apiClient.get(`posts/${id}`),
  all: () => apiClient.get("posts/all"),
  count: ({ problemId }) =>
    apiClient.get(`posts/${problemId}/counts`).catch((error) => error),
  submit: ({ data, problemId }) =>
    apiClient.post(`posts/${problemId}/submit`, data).catch((error) => error),
};

export default apiPosts;
