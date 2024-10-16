import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../GlobalContext";

export default function useGetAllSites() {
  const { alert, setLoading } = useContext(GlobalContext);
  const [allsites, setAllsites] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/allsites`, {
        method: "GET",
        headers: { authorization: localStorage.getItem("auth") },
      });

      const { data, error } = await res.json();

      if (!res.ok) alert({ type: "warning", title: "Warning!", text: `HTTP error! status: ${res.status} - ${error}` });
      else setAllsites(data.sites);
    })()
      .catch((e) => alert({ type: "error", title: "Error!", text: e.message }))
      .finally(() => setLoading(false));
  }, [alert, setLoading]);

  return allsites;
}
