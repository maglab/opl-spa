import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MuiListComponent from "./MuiListComponent";
import apiProblems from "../../../../api/apiProblems";
import { questionActions } from "../../../../state/Question/questionSlice";
import sortQuery from "../../../../utils/functions/dataManipulation/sortQuery";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import {
  checkFilters,
  applyFilters,
  applyQueryString,
} from "./utils/listFilteringFunctions";

function QuestionList() {
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
    const action = {
      function: questionActions.setState,
      params: { key: "allProblems", value: null }, //Default to null
    };
    const setStates = { setError, setLoading };
    if (filtersOn || selectedSorting) {
      applyFilters(api, dispatch, action, setStates);
    }
  }, [filtersOn, filters, selectedSorting]);
  // Finally we sort the list based on the query string.
  useEffect(() => {
    if (!problemsArray) return; //Guard clause to prevent executing when problems haven't been fetched yet
    const fuseOptions = {
      threshold: 0.5,
      keys: ["title"], //For now we search by title - may extrend to other values
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
        z<p className="text-2xl"> {error.message}</p>
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
      <ul>
        {displayedProblems.map((item) => (
          <MuiListComponent key={item.problem_id} problem={item} />
        ))}
      </ul>
    );
  }

  if (filtersOn || selectedSorting) {
    return (
      <ul className="problem-list ">
        {problemsArray &&
          problemsArray.length > 0 &&
          problemsArray.map((item) => (
            <MuiListComponent key={item.problem_id} problem={item} />
          ))}
        {problemsArray && problemsArray.length === 0 && (
          <div className="py-4">
            {" "}
            <p className="text-center">
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
