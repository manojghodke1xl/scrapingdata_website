import { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../GlobalContext";

const useSetTimeout = (apiUrl, page, limit, val, key, delay = 500) => {
  const { setLoading } = useContext(GlobalContext);
  const timeOutRef = useRef(0);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
      timeOutRef.current = setTimeout(async () => {
        setLoading(true);
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/${apiUrl}?p=${page}&n=${limit}&s=${val}&k=${key}`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("auth"),
            },
          }
        );

        const { data, error } = await res.json();

        if (!res.ok)
          throw new Error(`HTTP error! status: ${res.status} - ${error}`);

        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, delay);
    return () => clearTimeout(timeOutRef.current);
  }, [val, delay, apiUrl, page, limit, key, setLoading]);

  return [error, data];
};

export default useSetTimeout;
