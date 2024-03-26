import { useQuery } from "@tanstack/react-query";
import { getProblemAllAnnotations, getProblems } from "../apiNew/apiProblems";
import QUERY_KEYS from "./queryKeys";

export function useGetProblems({ query, pageNum, pageSize } = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.getProblems, query, pageNum, pageSize],
    queryFn: () => getProblems({ query, pageNum, pageSize }),
  });
}

export function useGetProblemAllAnnotations(id, { fields } = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.getProblemAllAnnotation, id, fields],
    queryFn: () => getProblemAllAnnotations(id, { fields }),
  });
}
