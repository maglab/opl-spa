import { LinearProgress } from "@mui/material";
import { useMemo } from "react";

import Chip from "../../../../../components/UI/Chip/Chip";
import useGetApi from "../../../../../utils/hooks/useApi";
import apiAnnotations from "../../../../../api/apiAnnotations";
import extractAnnotationInformation from "../../../../../utils/functions/extractAnnotationInformation";

/**
 * Attached annotations for a particular open problem in the form of chips.
 * @param {Number} param0 id - The ID of an open problem we need to display annotations for.
 * @returns
 */
function ChipSection({ id }) {
  const { isLoading, apiData, error } = useGetApi(
    apiAnnotations.getAnnotationsForProblem,
    {
      all: true,
      problemId: id,
      fields: ["compound", "subject", "gene", "species"],
    },
  );

  const annotations = useMemo(() => {
    // The api returns a nested structure of all annotations relating to an open problem we need to flatten it first so its easy to display
    if (apiData && !error) {
      //We flatten by one level here
      const flattenedAnnotations = Object.entries(apiData).flatMap(
        ([key, values]) => values.map((value) => ({ [key]: value[key] })),
      );
      //Only parse if there are annotations present
      if (flattenedAnnotations.length == 0) return [];
      let formattedAnnotations = [];
      //Now we extract the titles and other information we may need, but for chips only the titles. We can use the extracted IDs for keys.
      for (const annotation of flattenedAnnotations) {
        const category = Object.keys(annotation)[0];
        const annotation_object = Object.values(annotation)[0];
        const extracted = extractAnnotationInformation(
          annotation_object,
          category,
        );

        formattedAnnotations.push(extracted);
      }

      return formattedAnnotations;
    }
    return []; //Return nothing if conditions are not met
  }, [id, apiData]);

  //We need
  return (
    <>
      {isLoading && <LinearProgress />}
      {annotations.length > 0 &&
        annotations.map((annotation) => (
          <Chip key={annotation.id}>{annotation.title}</Chip>
        ))}
    </>
  );
}

export default ChipSection;
