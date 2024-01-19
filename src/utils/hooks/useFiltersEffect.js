import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { questionActions } from "../../state/Question/questionSlice";
import apiProblems from "../../api/apiProblems";
import sortQuery from "../functions/dataManipulation/sortQuery";
/**
 * Helper function. Checks whether the redux store cotanins user applied filters
 * @param {Object} filterObj - Object of filters that come from the redux store
 * @param {Function} dispatch - Dispatch function
 * @param {{action: Function, params: Object}} trueAction - Redux action and its parameters to be sent to the redux store
 * @param {{action: Function, params: Object}} falseAction - Redux action and its parameters to be sent to the redux store
 */

function checkFilters(filterObj, dispatch, trueAction, falseAction) {
  //Iterate through filter filterObj and determine whether there are user selected filters
  for (let key in filterObj) {
    if (Array.isArray(filterObj[key]) && filterObj[key].length > 0) {
      //We check for arrays and ids within the arrays to determine applied filters, execute relevant function here
      dispatch(trueAction.action(trueAction.params));
      return;
    }
    dispatch(falseAction.action(falseAction.params));
  }
}

/**
 * Helper function. Uses filter object to create api call, set error and loading states and store response in redux.
 * @param {{apiCall: Function, queryParams: Object }} api - The api call and its parameters to be sent
 * @param {Function} dispatch - Redux dispatch function - a set state function for applying a value a state.
 * @param {[{function: Function, params: Object}]} actions - Redux action to be called and its parameters
 * @param {{setLoading: Function, setError}} setStates - Set states for loading and error.
 */
async function applyFilters(api, dispatch, action, setStates) {
  const { setLoading, setError } = setStates;
  const { apiCall, queryParams } = api;
  try {
    const response = await apiCall({ queryParams });
    const data = response.data;
    if (response.status === 200) {
      //The dispatch action
      dispatch(action({ key: "allProblems", value: data.results }));
      dispatch(action({ key: "count", value: data.count }));
      dispatch(action({ key: "nextPage", value: data.next }));
      // dispatch(action.function({key:"page": value:data.page}))
      setLoading(false);
    }
  } catch (error) {
    setError(error);
    setLoading(false);
  }
}
/**
 * React hook for checking, applying and retrieving filtered open problems from the API.
 * @param {Object} filters - Object containing filters to send to the API as query parameters
 * @param {boolean} filtersOn  - True if filters on false if not.
 * @param {String} selectedSorting - String to determine how open problems will be sorted, to also be sent as a query parameter.
 * @param {Function} setLoading - useState function for setting state.
 * @param {Function} setError - useState function for setting state.
 */
export default function useFiltersEffect({
  filters,
  filtersOn,
  selectedSorting,
  setLoading,
  setError,
}) {
  const dispatch = useDispatch();

  //Check if filters have been applied first
  useEffect(() => {
    const trueAction = { action: questionActions.setState, params: true };
    const falseAction = { ...trueAction, params: false };
    checkFilters(filters, dispatch, trueAction, falseAction);
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    // Process the query parameters in the appropriate format for the GET request
    const api = {
      apiCall: apiProblems.getProblems,
      queryParams: sortQuery(filters),
    };
    // The action to be executed and its required parameters
    const action = questionActions.setState;
    const setStates = { setError, setLoading };
    // If there are selected sorting or filters, then send the request using applyFilters function
    if (filtersOn || selectedSorting) {
      applyFilters(api, dispatch, action, setStates);
    }
  }, [filtersOn, filters, selectedSorting]);
}
