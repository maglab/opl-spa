import { useQuery } from "@tanstack/react-query";
import { getNcbiGenes, getNcbiTaxons } from "../apiNew/apiNcbi";
import QUERY_KEYS from "./queryKeys";

export function useGetNcbiTaxons(ids) {
  return useQuery({
    queryKey: [QUERY_KEYS.getNcbiTaxons, ids],
    queryFn: async () => {
      const result = await getNcbiTaxons(ids);
      const map = result.data.taxonomy_nodes.reduce(
        (acc, { taxonomy }) => ({
          [taxonomy.tax_id]: taxonomy,
          ...acc,
        }),
        {}
      );
      const mapped = ids.map((id) => map[id]);
      return mapped;
    },
  });
}

export function useGetNcbiGenes(ids) {
  return useQuery({
    queryKey: [QUERY_KEYS.getNcbiGenes, ids],
    queryFn: async () => {
      const result = await getNcbiGenes(ids);
      const map = result.data.reports.reduce(
        (acc, { gene }) => ({
          [gene.gene_id]: gene,
          ...acc,
        }),
        {}
      );
      const mapped = ids.map((id) => map[id]);
      return mapped;
    },
  });
}
