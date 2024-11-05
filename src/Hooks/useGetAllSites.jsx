import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { getAllSitesApi } from "../apis/site-apis";

export default function useGetAllSites() {
  const { alert, setLoading } = useContext(GlobalContext);
  const [allsites, setAllsites] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status, data } = await getAllSitesApi();
      if (status) setAllsites(data.sites);
      else alert({ type: "warning", title: "Warning!", text: "Sites not found" });
    })().finally(() => setLoading(false));
  }, [alert, setLoading]);

  return allsites;
}
