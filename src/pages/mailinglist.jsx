import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
// import { convertToCSV } from "../utils/exporter";

export default function MailingList() {
  const { alert, setLoading } = useContext(GlobalContext);

  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/lists?p=${page}&n=${limit}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        setLists(data.lists);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })()
      .catch((error) => alert({ type: "danger", title: "Error !", text: error.message }))
      .finally(() => setLoading(false));
  }, [alert, limit, page, setLoading]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Mailing Lists</h3>
          </div>
          <div className="list-group list-group-flush">
            {lists.map((lst) => (
              <span key={lst._id} className="list-group-item list-group-item-action">
                {JSON.stringify(lst)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
