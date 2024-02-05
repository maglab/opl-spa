import apiClient, { apiRequest } from "./apiClient";

const apiSubmissions = {
  getSubmissions: async (params) => {
    const problemId = params.problemId;
    try {
      const response = await apiClient.get(`posts/${problemId}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  getAllSubmissions: async () => {
    return apiRequest(() => apiClient.get("posts/all"));
  },
  getSubmissionCount: async (params) => {
    const problemId = params.problemId;
    try {
      const response = await apiClient.get(`posts/${problemId}/counts`);
      return response;
    } catch (error) {
      return error;
    }
  },
  postSubmission: async (params) => {
    const data = params.data;
    const problemId = params.problemId;
    try {
      const response = await apiClient.post(`posts/${problemId}/submit`, data);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default apiSubmissions;
