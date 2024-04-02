import apiClient from "./apiClient";

export const getChemblCompound = (id) =>
  apiClient.get(`https://www.ebi.ac.uk/chembl/api/data/molecule/${id}`, {
    params: { format: "json" },
  });

export default undefined;
