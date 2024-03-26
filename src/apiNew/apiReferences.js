import apiClient from "./apiClient";

export const getReferenceForProblem = async ({ openProblemId }) =>
  apiClient.get(`open-problems/${openProblemId}/references`);

export const verifyReference = async ({ type, value }) =>
  apiClient.post(`posts/verify-reference`, { type, value });

export const verifyReferences = async ({ references }) =>
  apiClient.post("posts/verify-references", { references });

export const getReferenceForSolution = async ({ submissionId }) =>
  apiClient.get(`posts/get/${submissionId}/submission/reference`);
