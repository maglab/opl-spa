import apiClient, { apiRequest } from "./apiClient";

const apiReferences = {
  getReferenceForProblem: async (params) => {
    const { openProblemId } = params;
    return apiRequest(() =>
      apiClient.get(`open-problems/${openProblemId}/references`)
    );
  },
  verifyReference: async (params) => {
    const { type, value } = params;
    const data = {
      type,
      value,
    };
    return apiRequest(() => apiClient.post(`posts/verify-reference`, data));
  },

  verifyReferences: async (params) => {
    const { references } = params;
    const data = {
      references,
    };
    return apiRequest(() => apiClient.post("posts/verify-references", data));
  },
  getReferenceForSolution: async (params) => {
    const { submissionId } = params;
    return apiRequest(() =>
      apiClient.get(`posts/get/${submissionId}/submission/reference`)
    );
  },
};

export default apiReferences;
