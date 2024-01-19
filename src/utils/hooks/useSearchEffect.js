import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Fuse from "fuse.js";
/**
 * Helper function. Sets up fuse instance for fuzzy searching results.
 * @param {Object} fuseOptions - Options for finetuning Fuse instance
 * @param {Array} fuseArray - Data to be searched through
 * @param {String} searchQuery - Query string
 * @returns {Array} - Returns an array of results
 */
function applyQueryString(fuseOptions, fuseArray, searchQuery) {
  const fuseInstance = new Fuse(fuseArray, fuseOptions);
  const results = fuseInstance.search(searchQuery);
  const extractedResults = results.map((result) => result.item);
  return extractedResults;
}

/**
 *Custom hook for applying fuzzy search to open problems. Searches through title and description of title NOTE: TEMPORARY
 * @param {String} searchQuery - String to fuzzy search against.
 */
export default function useSearchEffect(searchQuery) {
  const dispatch = useDispatch();
  const problemsArray = useSelector((state) => state.question.allProblems);

  useEffect(() => {
    if (!problemsArray) return;

    const fuseOptions = {
      threshold: 0.5,
      keys: ["title", "description"],
    };
    const results = applyQueryString(fuseOptions, problemsArray, searchQuery);

    if (results.length > 0) {
      dispatch(
        questionActions.setState({ key: "filteredResults", value: results })
      );
    } else {
      dispatch(
        questionActions.setState({ key: "filteredResults", value: null })
      );
    }
  }, [searchQuery]);
}
