import apiClient, { apiRequest } from "./apiClient";
import { RECAPTCHA_SECRET_KEY } from "../config";

const apiProblems = {
  getDetails: async (params) => {
    const id = params.id;
    try {
      const response = await apiClient.get("open-problems/" + id);
      return response;
    } catch (error) {
      return error;
    }
  },
  getProblems: async (params) => {
    const queryParams = params.queryParams;
    return apiRequest(() =>
      apiClient.get("open-problems", { params: queryParams })
    );
  },
  postProblem: async (params) => {
    const data = params.data;
    try {
      const response = await apiClient.post("open-problems/submit", data);
      return response;
    } catch (error) {
      return error;
    }
  },
  verifyToken: async (params) => {
    const SECRET_KEY = RECAPTCHA_SECRET_KEY;
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
};

export default apiProblems;
