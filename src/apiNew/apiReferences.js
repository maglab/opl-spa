import apiClient from "./apiClient";

export const getReferenceForProblem = async ({ openProblemId }) =>
  apiClient.get(`open-problems/${openProblemId}/references`);

export const verifyReference = async ({ type, value }) =>
  apiClient.post(`references/convert`, { type, value });

export const getReferenceForSolution = async ({ submissionId }) =>
  apiClient.get(`posts/get/${submissionId}/submission/reference`);
