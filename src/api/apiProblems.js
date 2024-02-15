import { RECAPTCHA_SECRET_KEY } from "../config";
import apiClient, { apiRequest } from "./apiClient";

const apiProblems = {
  getDetails: async (params) => {
    const { id } = params;
    return apiRequest(() => apiClient.get(`open-problems/${id}`));
  },
  getProblems: async (params) => {
    const { queryParams } = params;
    return apiRequest(() =>
      apiClient.get("open-problems", { params: queryParams })
    );
  },
  postProblem: async (params) => {
    const data = params.data;
    return apiRequest(() => apiClient.post("open-problems/submit", data));
  },
  verifyToken: async (params) => {
    const SECRET_KEY = RECAPTCHA_SECRET_KEY;
    const token = params.token;
    return apiRequest(() =>
      apiClient.post("open-problems/verify-token", {
        secret: SECRET_KEY,
        response: token,
      })
    );
  },
};

export default apiProblems;
