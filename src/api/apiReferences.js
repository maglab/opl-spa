import apiClient from "./apiClient";

const apiReferences = {
  verifyReference: ({ type, value }) =>
    apiClient.post("references/convert", { type, value }),
};

export default apiReferences;
