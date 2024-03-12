import apiClient from "./apiClient";

const apiPosts = {
  forOpenProblem: ({ id, params }) => apiClient.get(`posts/${id}`, params),
  all: () => apiClient.get("posts/all"),
  submit: ({ data, problemId }) =>
    apiClient.post(`posts/${problemId}/submit`, data).catch((error) => error),
};

export default apiPosts;
