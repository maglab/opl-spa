import { useQuery } from "@tanstack/react-query";
import {
  getDetails,
  getProblemAllAnnotations,
  getProblems,
} from "../apiNew/apiProblems";
import QUERY_KEYS from "./queryKeys";

export function useGetProblems({ query, pageNum, pageSize } = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.getProblems, query, pageNum, pageSize],
    queryFn: () => getProblems({ query, pageNum, pageSize }),
  });
}

export function useGetProblemDetail(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.getProblemDetail, id],
    queryFn: () => getDetails(id),
  });
}

export function useGetProblemAllAnnotations(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.getProblemAllAnnotations, id],
    queryFn: () => getProblemAllAnnotations(id),
  });
}
