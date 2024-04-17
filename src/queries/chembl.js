import { useQuery } from "@tanstack/react-query";
import { getChemblCompound as getChemblMolecule } from "../apiNew/apiChembl";
import QUERY_KEYS from "./queryKeys";

export function useGetChemblMolecule(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.getChemblMolecule, id],
    queryFn: () => getChemblMolecule(id),
  });
}

export default undefined;
