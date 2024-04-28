import { EXCLUDE_DATA_KEYS } from "../../constants/annotationDataKeys";
import { Submission } from "../../constants/annotationInterfaces";
// Data reformatting for submission data.
function excludeField<T, K extends keyof T>(item: T, fieldName: K): Omit<T, K> {
  const { [fieldName]: _, ...rest } = item;
  return rest;
}

// Generalized function to format an array
function formatArray<Type, T>(
  array: Type[],
  formatFn: (item: Type, ...args: any[]) => T,
  ...formatFnArgs: any[]
): T[] {
  return array.map((item) => formatFn(item, ...formatFnArgs));
}

export default function formatSubmitData(values: Submission) {
  const references = values.references.map((reference) => reference.data);
  const tags = formatArray(
    values.tags,
    excludeField,
    EXCLUDE_DATA_KEYS.openProblemCount
  );
  const compounds = formatArray(
    values.compounds,
    excludeField,
    EXCLUDE_DATA_KEYS.openProblemCount
  );
  const genes = formatArray(
    values.genes,
    excludeField,
    EXCLUDE_DATA_KEYS.openProblemCount
  );
  const species = formatArray(
    values.genes,
    excludeField,
    EXCLUDE_DATA_KEYS.openProblemCount
  );

  return {
    ...values,
    references,
    tags,
    compounds,
    genes,
    species,
  };
}
