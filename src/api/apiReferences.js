import apiClient from "./apiClient";
import { apiRequest } from "./apiClient";

const apiReferences = {
  getReferenceForProblem: async (params) => {
    const openProblemId = params.openProblemId;
    return apiRequest(() =>
      apiClient.get(`open-problems/${openProblemId}/references`)
    );
  },
  verifyReference: async (params) => {
    const type = params.type;
    const value = params.value;
    const data = {
      type: type,
      value: value,
    };
    return () => apiClient.post(`posts/verify-reference`, data);
  },

  verifyReferences: async (params) => {
    const references = params.references;
    const data = {
      references: references,
    };
    return apiRequest(() => apiClient.post("posts/verify-references", data));
  },
  getReferenceForSolution: async (params) => {
    const submissionId = params.submissionId;
    return apiRequest(() =>
      apiClient.get(`posts/get/${submissionId}/submission/reference`)
    );
  },
};

export default apiReferences;
