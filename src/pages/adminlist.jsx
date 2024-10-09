import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";

export default function AdminList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(8);
  const [sitesMap, setSitesMap] = useState({});

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admins?p=${page}&n=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );

      const { data, error } = await res.json();
      if (res.ok) {
        setLists(data.admins);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })()
      .catch((error) =>
        alert({ type: "danger", title: "Error !", text: error.message })
      )
      .finally(() => setLoading(false));
  }, [alert, limit, page, setLoading]);

  const headers = [
    { label: "Admin Name" },
    { label: "Admin Email" },
    { label: "Actions" },
  ];

  const rows = lists.map((admin) => [
    admin.name,
    admin.email,
    <button
      onClick={() => navigate(`/add-admin/${admin._id}`)}
      className="btn btn-primary w-100"
    >
      Edit
    </button>,
  ]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Admins List</h3>
            <div className="card-options">
              <button
                onClick={() => navigate("/add-admin")}
                className="btn btn-primary"
              >
                Add Admin
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <Table
              headers={headers}
              rows={rows}
              currentPage={page}
              totalPages={Math.ceil(lists.length / limit)}
              onPageChange={handlePageChange}
              entriesPerPage={limit}
              onEntriesChange={handleLimitChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
