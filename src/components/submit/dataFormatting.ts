import {
  Compound,
  Gene,
  Reference,
  Species,
  Submission,
  Tag,
} from "../../constants/annotationInterfaces";

// Data reformatting for submission data.
function excludeField<T, K extends keyof T>(item: T, fieldName: K): Omit<T, K> {
  const { [fieldName]: _, ...rest } = item;
  return rest;
}

export class DataFormatter {
  private static formatReferences(references: Reference[]): any[] {
    return references.map((reference) => reference.data);
  }

  private static formatArray<T extends { open_problem_count?: number }>(
    array: Array<T | string>
  ): Array<Omit<T, "open_problem_count"> | string> {
    return array.map((item) => {
      if (typeof item === "string") {
        return item; // Return strings as is
      }
      return excludeField(item, "open_problem_count");
    });
  }

  static formatSubmissionData(submission: Submission): {
    references: Object[];
    tags: (Omit<Tag, "open_problem_count"> | string)[];
    genes: (Omit<Gene, "open_problem_count"> | string)[];
    compounds: (Omit<Compound, "open_problem_count"> | string)[];
    species: (Omit<Species, "open_problem_count"> | string)[];
  } {
    const { references, tags, genes, compounds, species } = submission;
    return {
      references: this.formatReferences(references),
      tags: this.formatArray(tags),
      genes: this.formatArray(genes),
      compounds: this.formatArray(compounds),
      species: this.formatArray(species),
    };
  }
}

export default function formatSubmitData(values: Submission) {
  const reformattedData = DataFormatter.formatSubmissionData(values);
  return { ...values, ...reformattedData };
}
