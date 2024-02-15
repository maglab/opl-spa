import apiClient, { apiRequest } from "./apiClient";
import { RECAPTCHA_SECRET_KEY } from "../config";

const apiProblems = {
  getDetails: async (params) => {
    const id = params.id;
    return apiRequest(() => apiClient.get("open-problems/" + id));
  },
  getProblems: async (params) => {
    const queryParams = params.queryParams;
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
