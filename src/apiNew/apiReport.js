import apiClient from "./apiClient";

export const reportContactUs = async (postData) =>
  apiClient.post("report/", postData);

export const reportProblem = async (postData) =>
  apiClient.post("report/open-problem", postData);
