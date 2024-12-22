import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error, status ${response.status}`);
        }
        const result = await response.json();
          setData(result);
          setIsLoading(false);
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();

  }, [url]);

  return { data, isLoading, error };
}
