import { RECAPTCHA_SECRET_KEY } from "../config";
import apiClient from "./apiClient";

export const getDetails = async (id) => apiClient.get(`open-problems/${id}`);

export const getProblems = async ({ query, pageNum, pageSize, sorting } = {}) =>
  apiClient.get("open-problems", {
    params: { search: query, p: pageNum, page_size: pageSize, sorting },
  });

export const postProblem = async (data) =>
  apiClient.post("open-problems/submit", data);

export const verifyToken = async ({ token }) => {
  const SECRET_KEY = RECAPTCHA_SECRET_KEY;
  return apiClient.post("open-problems/verify-token", {
    secret: SECRET_KEY,
    response: token,
  });
};
