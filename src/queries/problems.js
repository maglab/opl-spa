import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDetails, getProblems, postProblem } from "../apiNew/apiProblems";
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

export function usePostProblem() {
  const queryClient = useQueryClient();
  return useMutation({
    queryKey: QUERY_KEYS.postProblem,
    // Make sure to define mutationFn as a function that takes postData
    mutationFn: (postData) => postProblem(postData),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.getProblems);
    },
  });
}
