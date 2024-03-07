import apiClient from "./apiClient";

const apiPosts = {
  forOpenProblem: ({ id }) => apiClient.get(`posts/${id}`),
  all: () => apiClient.get("posts/all"),
  submit: ({ data, problemId }) =>
    apiClient.post(`posts/${problemId}/submit`, data).catch((error) => error),
};

export default apiPosts;
