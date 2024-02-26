import { useEffect, useState } from "react";

// To replace useApi
export function useGetApi(api, params, defaultState = null) {
  const [apiData, setApiData] = useState(defaultState);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getApiData() {
      try {
        const response = await api(params);
        const data = response.data;
        setApiData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getApiData();
  }, []);
  return { isLoading, apiData, error };
}

export default useGetApi;
