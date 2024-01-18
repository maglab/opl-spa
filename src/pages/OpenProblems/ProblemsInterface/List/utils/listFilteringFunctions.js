import Fuse from "fuse.js";
/**
 * Checks whether the redux store cotanins user applied filters
 * @param {Object} filterObj - Object of filters that come from the redux store
 * @param {Function} dispatch - Dispatch function
 * @param {{action: Function, params: Object}} trueAction - Redux action and its parameters to be sent to the redux store
 * @param {{action: Function, params: Object}} falseAction - Redux action and its parameters to be sent to the redux store
 */

export function checkFilters(filterObj, dispatch, trueAction, falseAction) {
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
 *
 * @param {{apiCall: Function, queryParams: Object }} api - The api call and its parameters to be sent
 * @param {Function} dispatch - Redux dispatch function - a set state function for applying a value a state.
 * @param {[{function: Function, params: Object}]} actions - Redux action to be called and its parameters
 * @param {{setLoading: Function, setError}} setStates - Set states for loading and error.
 */
export async function applyFilters(api, dispatch, action, setStates) {
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
 *
 * @param {Object} fuseOptions - Options for finetuning Fuse instance
 * @param {Array} fuseArray - Data to be searched through
 * @param {String} searchQuery - Query string
 * @returns {Array} - Returns an array of results
 */
export function applyQueryString(fuseOptions, fuseArray, searchQuery) {
  const fuseInstance = new Fuse(fuseArray, fuseOptions);
  const results = fuseInstance.search(searchQuery);
  const extractedResults = results.map((result) => result.item);
  return extractedResults;
}
