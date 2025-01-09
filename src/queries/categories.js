import { useQuery } from "@tanstack/react-query";

import getCategories from "../apiNew/apiCategories";

function useCategories() {
  return useQuery({
    queryKey: ["categories"], // Add a unique key for this query
    queryFn: getCategories,
  });
}

export default useCategories;
