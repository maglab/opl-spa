import apiClient from "./apiClient";
import { apiRequest } from "./apiClient";
const apiComments = {
  postComment: async (params) => {
    const submissionId = params.submissionId;
    const postData = params.data;
    try {
      const response = await apiClient.post(
        `posts/post/${submissionId}/comment/submit`,
        postData,
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  getComments: async (params) => {
    const submissionId = params.submissionId;
    try {
      const response = await apiClient.get(
        `posts/get/${submissionId}/comments`,
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  getRootComments: async (params) => {
    const submissionId = params.submissionId;
    try {
      const response = await apiClient.get(
        `posts/get/${submissionId}/comments`,
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default apiComments;
