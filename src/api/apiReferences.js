import apiClient from "./apiClient";
import { apiRequest } from "./apiClient";

const apiReferences = {
  getReferenceForProblem: async (params) => {
    const openProblemId = params.openProblemId;
    try {
      const response = await apiClient.get(
        `open-problems/${openProblemId}/references`
      );
      if (response.status === 204) {
        //If no content return null
        return null;
      }
      return response;
    } catch (error) {
      return error;
    }
  },
  verifyReference: async (params) => {
    const type = params.type;
    const value = params.value;
    const data = {
      type: type,
      value: value,
    };
    try {
      const response = await apiClient.post(`posts/verify-reference`, data);
      if (response.status === 200) {
        return response;
      } else if (response.status === 404) {
        return "Unable to retrieve reference information";
      }
    } catch (error) {
      return error;
    }
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
    try {
      const response = await apiClient.get(
        `posts/get/${submissionId}/submission/reference`
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
