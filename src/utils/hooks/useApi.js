import { useEffect, useState } from "react";
import { apiRequest } from "../../api/apiClient";
// To replace useApi
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
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getApiData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFunction, JSON.stringify(params)]); // adding apiFunction and params as dependencies

  return { isLoading, apiData, error };
}

export default useGetApi;
