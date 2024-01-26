import { useEffect, useState } from "react";

/**
 * Hook for making an API call and setting a loading and error state for conditional rendering.
 * @param {Function} apiFunction - Api call function.
 * @param {Object} params - Used to set the query parameters for the get request.
 * @param {*} defaultApi - Sets the default value for the API data state
 * @returns {Object} - Returns a state for the data, loading and error.
 */
function useGetApi(apiFunction, params, defaultApi = null) {
  const [apiData, setApiData] = useState(defaultApi);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getApiData() {
      setLoading(true);
      try {
        // Call the provided API function with params
        const response = await apiFunction(params);
        setApiData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getApiData();
  }, [JSON.stringify(params)]);

  return { isLoading, apiData, error };
}

export default useGetApi;
