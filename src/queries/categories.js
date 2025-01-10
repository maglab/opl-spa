import { useQuery } from "@tanstack/react-query";

import { getCategories, getCategory } from "../apiNew/apiCategories";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"], // Add a unique key for this query
    queryFn: getCategories,
  });
}

export function useCategory(id) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
  });
}
