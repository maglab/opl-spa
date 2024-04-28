import apiClient from "./apiClient";

const apiPosts = {
  getSolution: ({ id }) => apiClient.get(`posts/solutions/${id}`),
  getDiscussion: ({ id }) => apiClient.get(`posts/solutions/${id}`),
  solutionsForOpenProblem: ({ openProblemId, params }) =>
    apiClient.get(`posts/solutions/${openProblemId}`, params),
  solutionsSubmit: ({ data, openProblemId }) =>
    apiClient.post(`posts/solutions/${openProblemId}`, data),
  discussionsForOpenProblem: ({ openProblemId, params }) =>
    apiClient.get(`posts/discussions/${openProblemId}`, params),
  discussionsSubmit: ({ data, openProblemId }) =>
    apiClient.post(`posts/discussions/${openProblemId}`, data),
};

export default apiPosts;
