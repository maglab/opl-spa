import { useQuery } from "@tanstack/react-query";

import { verifyReference } from "../apiNew/apiReferences";

function useVerifyReferences(type, value) {
  return useQuery({ queryKey: [type, value], queryFn: verifyReference });
}

export default useVerifyReferences;
