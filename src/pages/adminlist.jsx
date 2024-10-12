import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";

export default function AdminList() {
  const navigate = useNavigate();
  const { auth, alert, setLoading } = useContext(GlobalContext);

  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0); // To track the total number of admins

  useLayoutEffect(() => {
    if (!auth.isSuperAdmin) navigate("/dashboard");
  }, [auth]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admins?p=${page - 1}&n=${limit}`,
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
        setTotalCount(data.count); // Use 'count' from API response
      } else {
        alert({ type: "warning", title: "Warning!", text: error });
      }
    })()
      .catch((error) =>
        alert({ type: "danger", title: "Error!", text: error.message })
      )
      .finally(() => setLoading(false));
  }, [alert, limit, page, setLoading]);

  const headers = [
    { label: "Admin Name" },
    { label: "Admin Email" },
    { label: "Status" },
    { label: "Actions" },
  ];

  const rows = lists.map((admin) => [
    admin.name,
    admin.email,
    admin.isBlocked === true ? (
      <span className="badge bg-danger">Blocked</span>  
    ) : (
      <span className="badge bg-success">Active</span>
    ), 
    <button
      key={admin._id}
      onClick={() => navigate(`/add-admin/${admin._id}`)}
      className="btn btn-primary "
    >
      Edit
    </button>,
  ]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(0); // Reset to the first page on limit change
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
                className="btn btn-primary "
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
              totalPages={Math.ceil(totalCount / limit)} // Calculate total pages based on count
              onPageChange={handlePageChange}
              
              entriesPerPage={limit}
              onEntriesChange={handleLimitChange}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
