import apiClient, { apiRequest } from "./apiClient";

const apiReferences = {
  getReferenceForProblem: async (params) => {
    const { openProblemId } = params;
    try {
      const response = await apiClient.get(
        `open-problems/${openProblemId}/references`,
      );
      if (response.status === 204) {
        // If no content return null
        return null;
      }
      return response;
    } catch (error) {
      return error;
    }
  },
  verifyReference: async (params) => {
    const { type } = params;
    const { value } = params;
    const data = {
      type,
      value,
    };
    try {
      const response = await apiClient.post(`posts/verify-reference`, data);
      if (response.status === 200) {
        return response;
      }
      if (response.status === 404) {
        return "Unable to retrieve reference information";
      }
    } catch (error) {
      return error;
    }
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
    try {
      const response = await apiClient.get(
        `posts/get/${submissionId}/submission/reference`,
      );
      if ((response.status = 200)) {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  },
};

export default apiReferences;
