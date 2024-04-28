import { useQuery } from "@tanstack/react-query";
import { getDetails, getProblems } from "../apiNew/apiProblems";
import QUERY_KEYS from "./queryKeys";

export function useGetProblems({ query, pageNum, pageSize, sorting } = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.getProblems, query, pageNum, pageSize, sorting],
    queryFn: () => getProblems({ query, pageNum, pageSize, sorting }),
  });
}

export function useGetProblemDetail(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.getProblemDetail, id],
    queryFn: () => getDetails(id),
  });
}
