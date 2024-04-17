import apiClient from "./apiClient";

export const getNcbiTaxons = (ids) =>
  apiClient.get(
    `https://api.ncbi.nlm.nih.gov/datasets/v2alpha/taxonomy/taxon/${ids.join(",")}`
  );

export const getNcbiGenes = (ids) =>
  apiClient.get(
    `https://api.ncbi.nlm.nih.gov/datasets/v2alpha/gene/id/${ids.join(",")}`
  );

export default undefined;
