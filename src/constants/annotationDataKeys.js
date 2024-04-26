export const GENE_DATA_KEYS = {
  id: "id",
  name: "name",
  symbol: "gene_symbol",
  entrezId: "entrez_id",
  species: "species",
};

export const COMPOUND_DATA_KEYS = {
  id: "id",
  name: "name",
  chemblId: "chembl_id",
  pubchemId: "pubchem_id", // May not need
};

export const SPECIES_DATA_KEYS = {
  id: "id",
  name: "full_name",
  genus: "genus",
  species: "species",
  ncbiTaxonId: "ncbi_tax_id",
};

export const TAGS_DATA_KEYS = {
  id: "id",
  title: "title",
  description: "description",
};

export const EXCLUDE_DATA_KEYS = {
  // Data to exclude when sending back to the API.
  openProblemCount: "open_problem_count",
};
