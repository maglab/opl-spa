import { useQuery } from "@tanstack/react-query";
import { getAnnotationEntries } from "../apiNew/apiAnnotations";
import QUERY_KEYS from "./queryKeys";

function useGetAnnotationEntries(annotationType) {
  return useQuery({
    queryKey: [QUERY_KEYS.getAnnotationEntries, annotationType],
    queryFn: () => getAnnotationEntries({ annotationType }),
    enabled: !!annotationType, // This will be true only if annotationType is truthy
  });
}

export default useGetAnnotationEntries;
