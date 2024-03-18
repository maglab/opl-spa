import apiClient from "./apiClient";

const apiReferences = {
  forProblem: ({ openProblemId }) =>
    apiClient.get(`open-problems/${openProblemId}/references`), // Might not be needed anymore
  verifyReference: ({ type, value }) =>
    apiClient.post("references/convert", { type, value }),
};

export default apiReferences;
