export interface Tag {
  id: number;
  title: string;
  description: string;
  open_problem_count?: number;
}

export interface Gene {
  id: number;
  name: string;
  symbol: string;
  species: Species;
  open_problem_count?: number;
}

export interface Compound {
  id: number;
  name: string;
  chembl_id: string;
  pubchem_id: string;
  open_problem_count?: number;
}

export interface Species {
  id: number;
  genus: string;
  species: string;
  open_problem_count?: number;
}

export interface Reference {
  id: number;
  type: string;
  data: Object;
}

export interface Submission {
  title: string;
  description: string;
  first_name: string;
  last_name: string;
  email: string;
  organisation: string;
  job_field: string;
  tags: Tag[];
  genes: Gene[];
  compounds: Compound[];
  species: Species[];
  references: Reference[];
}
