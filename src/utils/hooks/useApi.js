import { useEffect, useState } from "react";

/**
 * Hook for making an API call and setting a loading and error state for conditional rendering.
 * @param {Function} apiFunction - Api call function.
 * @param {Object} params - Used to set the query parameters for the get request.
 * @returns {Object} - Returns a state for the data, loading and error.
 */
function useGetApi(apiFunction, params) {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getApiData() {
      setLoading(true);
      try {
        // Call the provided API function with params
        const response = await apiFunction(params);
        // Check if the response is an error instance
        if (response instanceof Error) {
          setError(response);
        } else {
          setApiData(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getApiData();
  }, [JSON.stringify(params)]); // adding apiFunction and params as dependencies

  return { isLoading, apiData, error };
}

export default useGetApi;
