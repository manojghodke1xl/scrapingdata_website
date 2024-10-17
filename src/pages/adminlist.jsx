import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import useSetTimeout from "../Hooks/useDebounce";
import useGetAllSites from "../Hooks/useGetAllSites";

export default function AdminList() {
  const navigate = useNavigate();
  const { auth, alert } = useContext(GlobalContext);

  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [siteId, setSiteId] = useState("");
  const allsites = useGetAllSites();

  const searchAbleKeys = ["Name", "Email"];
  const filter = ["All", "Active", "Inactive"];

  const [err, data] = useSetTimeout("admins", page - 1, limit, searchTerm, searchKey, statusFilter, siteId);

  useEffect(() => {
    if (data) {
      setAdmins(data.admins);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  useLayoutEffect(() => {
    if (!auth.isSuperAdmin) navigate("/dashboard");
  }, [auth, navigate]);

  const headers = [
    { label: "Admin Name" },
    { label: "Admin Email" },
    { label: "Status" },
    { label: "Actions" },
    { label: "Sites" },
  ];

  const rows = admins.map((admin) => [
    admin.name,
    admin.email,
    admin.isBlocked === true ? (
      <span className="badge bg-danger">Blocked</span>
    ) : (
      <span className="badge bg-success">Active</span>
    ),
    <button key={admin._id} onClick={() => navigate(`/edit-admin/${admin._id}`)} className="btn btn-primary ">
      Edit
    </button>,
    admin.isSuperAdmin
      ? allsites.map((s) => `${s.name} (${s.host})`).join(", ")
      : admin.sites.map((s) => `${s.name} (${s.host})`).join(", "),
  ]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Admins List</h3>
            <div className="card-options">
              <div className="text-secondary">
                Filter
                <div className="mx-2 d-inline-block">
                  <select className="form-select form-control-sm" onChange={(e) => setStatusFilter(e.target.value)}>
                    {filter.map((key, i) => (
                      <option key={i} value={key.toLowerCase()}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={() => navigate("/add-admin")} className="btn btn-primary ">
                Add Admin
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <Table
              rows={rows}
              headers={headers}
              currentPage={page}
              totalPages={Math.ceil(totalCount / limit)}
              onPageChange={setPage}
              entriesPerPage={limit}
              setSearchTerm={setSearchTerm}
              allsites={allsites}
              setSiteId={setSiteId}
              setSearchKey={setSearchKey}
              searchAbleKeys={searchAbleKeys}
              onEntriesChange={setLimit}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
