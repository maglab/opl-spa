import apiClient, { apiRequest } from "./apiClient";

const apiComments = {
  postComment: async (params) => {
    const { submissionId } = params;
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
    const { submissionId } = params;
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
    const { submissionId } = params;
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
