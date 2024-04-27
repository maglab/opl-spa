import SEARCH_SUBJECT_KEYS from "../../constants/problemQuerySubjectKeys";

interface QueryType {
  type: string;
  value: string;
}

interface QueryResult {
  title: string;
  references: string[];
  tags: string[];
  compounds: string[];
  species: string[];
  genes: string[];
  authors: string[];
}

const defaultResult: QueryResult = {
  title: "",
  references: [],
  tags: [],
  compounds: [],
  species: [],
  genes: [],
  authors: [],
};

function parseEntry(entry: string): QueryType {
  const [type, value] = entry.split(":");
  return { type, value };
}

function appendToList(list: string[], value: string): string[] {
  return [...list, value];
}
function updateTitle(currentTitle: string, value: string): string {
  return currentTitle ? `${currentTitle} ${value}` : value;
}
type UpdaterFunction = (res: QueryResult, value: string) => QueryResult;

const updater: { [key: string]: UpdaterFunction } = {
  [SEARCH_SUBJECT_KEYS.reference]: (res: QueryResult, value: string) => ({
    ...res,
    references: appendToList(res.references, value),
  }),
  [SEARCH_SUBJECT_KEYS.title]: (res: QueryResult, value: string) => ({
    ...res,
    title: updateTitle(res.title, value),
  }),
  [SEARCH_SUBJECT_KEYS.author]: (res: QueryResult, value: string) => ({
    ...res,
    authors: appendToList(res.authors, value),
  }),
  [SEARCH_SUBJECT_KEYS.tag]: (res: QueryResult, value: string) => ({
    ...res,
    tags: appendToList(res.tags, value),
  }),
  [SEARCH_SUBJECT_KEYS.compound]: (res: QueryResult, value: string) => ({
    ...res,
    compounds: appendToList(res.compounds, value),
  }),
  [SEARCH_SUBJECT_KEYS.species]: (res: QueryResult, value: string) => ({
    ...res,
    species: appendToList(res.species, value),
  }),
  [SEARCH_SUBJECT_KEYS.gene]: (res: QueryResult, value: string) => ({
    ...res,
    genes: appendToList(res.genes, value),
  }),
  // Add other keys similarly
};

function updateResult(
  result: QueryResult,
  type: string,
  value: string,
  updateFunctions: { [key: string]: UpdaterFunction }
) {
  const updateFunction = updateFunctions[type];
  if (!updateFunction) {
    throw new Error(`Unknown entry type: ${type}`);
  }
  return updateFunction(result, value);
}

export default function formatEntries(entries: string[]): QueryResult {
  return entries.reduce((acc, entry) => {
    const { type, value } = parseEntry(entry);
    return updateResult(acc, type, value, updater);
  }, defaultResult);
}
