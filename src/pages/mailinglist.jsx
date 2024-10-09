import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";

export default function MailingList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1000);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/lists?p=${page}&n=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );
      const { data, error } = await res.json();
      if (res.ok) {
        setLists(data.lists);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })()
      .catch((error) =>
        alert({ type: "danger", title: "Error !", text: error.message })
      )
      .finally(() => setLoading(false));
  }, [alert, limit, page, setLoading]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Mailing Lists</h3>
          </div>

          <div className="table-responsive">
            <table className="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th>Customer Email</th>
                  <th>Site Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {lists.map((lst) => (
                  <tr>
                    <td>{lst.email}</td>
                    <td>{lst.site.name}</td>

                    <td className="text-end">
                      <div className="col-6 col-sm-4 col-md-2 col-xl py-3">
                        <button
                          onClick={() => navigate(`/mailing/${lst._id}`)}
                          className="btn btn-primary w-100"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
