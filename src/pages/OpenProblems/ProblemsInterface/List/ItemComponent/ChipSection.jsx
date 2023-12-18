import { LinearProgress } from "@mui/material";
import { useMemo } from "react";

import Chip from "../../../../../components/UI/Chip/Chip";
import useGetApi from "../../../../../utils/hooks/useApi";
import apiAnnotations from "../../../../../api/apiAnnotations";
import extractAnnotationInformation from "../../../../../utils/functions/extractAnnotationInformation";
function ChipSection({ id }) {
  const { isLoading, apiData, error } = useGetApi(
    apiAnnotations.getAnnotationsForProblem,
    {
      all: true,
      problemId: id,
      fields: ["compound", "subject", "gene", "species"],
    }
  );

  const annotations = useMemo(() => {
    if (apiData && !error) {
      return Object.entries(apiData).flatMap(([key, values]) =>
        values.map((value) => ({ [key]: value }))
      );
    }
    return []; //Return nothing if conditions are not met
  }, [id, apiData]);
  console.log(apiData);
  return (
    <>
      {isLoading && <LinearProgress />}
      {annotations.length > 0 &&
        annotations.map((annotation) => <Chip>Test</Chip>)}
    </>
  );
}

export default ChipSection;
