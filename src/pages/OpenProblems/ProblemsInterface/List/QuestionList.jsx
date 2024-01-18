import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemComponent from "./ItemComponent/ItemComponent";
import apiProblems from "../../../../api/apiProblems";
import { questionActions } from "../../../../state/Question/questionSlice";
import sortQuery from "../../../../utils/functions/dataManipulation/sortQuery";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import {
  checkFilters,
  applyFilters,
  applyQueryString,
} from "./utils/listFilteringFunctions";
/**
 * Open Problems list main component.
 * @param {Number} param0 - Pagination number to be called to the API. Tracked by parent state.
 * @returns - List of all open problems sorted by pagination and annotations.
 */
function QuestionList({ paginationNumber }) {
  const problemsArray = useSelector((state) => state.question.allProblems);
  const displayedProblems = useSelector(
    (state) => state.question.filteredResults
  );
  const filters = useSelector((state) => state.question.filters);
  const searchQuery = useSelector((state) => state.question.searchQuery);
  const selectedSorting = useSelector(
    (state) => state.question.filters.sorting
  );
  const filtersOn = useSelector((state) => state.question.filterOpen);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // We need to create a useEffect function to track filter states and order the openProblems accordingly
  //Use a config file to determine what annotations are being searched for
  const dispatch = useDispatch();

  //Use effect runs in order specified so we should check if filters have been applied
  useEffect(() => {
    const trueAction = { action: questionActions.setState, params: true };
    const falseAction = { ...trueAction, params: false };
    checkFilters(filters, dispatch, trueAction, falseAction);
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    //Process the query parameters in appropriate format for get request
    const api = {
      apiCall: apiProblems.getProblems,
      queryParams: sortQuery(filters),
    };
    //The action to be executed and its required parameters
    const action = questionActions.setState;
    const setStates = { setError, setLoading };
    //If there is selected sorting or filters, then we send the request using the apply filters function. The request data is stored in redux using dispatch.
    if (filtersOn || selectedSorting) {
      applyFilters(api, dispatch, action, setStates);
    }
  }, [filtersOn, filters, selectedSorting]);

  // Finally we sort the list based on the query string.
  useEffect(() => {
    if (!problemsArray) return; //Guard clause to prevent executing when problems haven't been fetched yet
    const fuseOptions = {
      threshold: 0.5,
      keys: ["title", "description"], //For now we search by title - may extrend to other values
    };
    const results = applyQueryString(fuseOptions, problemsArray, searchQuery);
    //If more than one results then we populate the store else we keep it as null
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

  if (error) {
    return (
      <div>
        <p className="text-2xl"> {error.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center translate-y-1/2">
        <Spinner />
      </div>
    );
  }
  if (displayedProblems) {
    return (
      <ul className="problems-list space-y-1">
        {displayedProblems.map((item) => (
          <ItemComponent openProblem={item} />
        ))}
      </ul>
    );
  }

  if (filtersOn || selectedSorting) {
    return (
      <ul className="problem-list space-y-1">
        {problemsArray &&
          problemsArray.length > 0 &&
          problemsArray.map((item) => (
            <ItemComponent key={item.problem_id} openProblem={item} />
          ))}
        {problemsArray && problemsArray.length === 0 && (
          <div className="py-4">
            {" "}
            <p className="text-center font-semibold">
              {" "}
              No Open Problems matching this query.
            </p>
          </div>
        )}
      </ul>
    );
  }
}

export default QuestionList;
