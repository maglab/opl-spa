import apiClient from "./apiClient";
import { apiRequest } from "./apiClient";
const apiProblems = {
  postProblem: async (params) => {
    const data = params.data;
    try {
      const response = await apiClient.post("open-problems/submit", data);
      return response;
    } catch (error) {
      return error;
    }
  },
  getAllProblems: async () => {
    try {
      const response = await apiClient.get("open-problems");
      return response;
    } catch (error) {
      return error;
    }
  },
  getRootProblems: async () => {
    try {
      const response = await apiClient.get("open-problems/root");
      return response;
    } catch (error) {
      return error;
    }
  },
  getDetails: async (params) => {
    const id = params.id;
    try {
      const response = await apiClient.get("open-problems/" + id);
      return response;
    } catch (error) {
      return error;
    }
  },
  sortedDescendantsDescending: async () => {
    try {
      const response = await apiClient.get("open-problems/sorted/descendants");
      return response;
    } catch (error) {
      return error;
    }
  },
  sortedSubmissionsDescending: async () => {
    //This may not be required anymore as we are not using it currently
    try {
      const response = await apiClient.get("open-problems/sorted/submissions");
      return response;
    } catch (error) {
      return error;
    }
  },
  sortedSubmissionAnswered: async () => {
    try {
      const response = await apiClient.get("open-problems/sorted/answered");
      return response;
    } catch (error) {
      return error;
    }
  },
  verifyToken: async (params) => {
    const SECRET_KEY = process.env.REACT_APP_RECAPTCHA_SECRET_KEY;
    const token = params.token;
    try {
      const response = await apiClient.post("open-problems/verify-token", {
        secret: SECRET_KEY,
        response: token,
      });
      return response;
    } catch (error) {
      return error;
    }
  },

  reportProblem: async ({ id, reason, information, duplicate }) => {
    console.log("executed");
    return () =>
      apiRequest(
        apiClient.post("open-problems/report", {
          id,
          reason,
          information,
          duplicate,
        })
      );
  },
};

export default apiProblems;
