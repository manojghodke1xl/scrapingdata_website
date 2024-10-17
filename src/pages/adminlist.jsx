import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import useSetTimeout from "../Hooks/useDebounce";
import useGetAllSites from "../Hooks/useGetAllSites";

export default function AdminList() {
  const navigate = useNavigate();
  const { auth, alert, setLoading } = useContext(GlobalContext);

  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [siteId, setSiteId] = useState("");

  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const allsites = useGetAllSites();

  const searchAbleKeys = ["Name", "Email"];
  const filter = ["All", "Active", "Inactive"];

  const [err, data] = useSetTimeout(
    "admins",
    page - 1,
    limit,
    searchTerm,
    searchKey,
    statusFilter,
    siteId
  );

  useEffect(() => {
    if (data) {
      setAdmins(data.admins);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);


  const updateSelectedAdminsStatus = async (status) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin-status`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("auth"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedAdmins, isBlocked: status }),
        }
      );
  
      const { error } = await res.json();
  
      if (res.ok) {
        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            selectedAdmins.includes(admin._id)
              ? { ...admin, isBlocked: status }
              : admin
          )
        );
        alert({
          type: "success",
          title: "Updated!",
          text: `Selected admin(s) have been marked as ${
            status ? "Inactive" : "Active"
          }.`,
        });
        setSelectedAdmins([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
    }
  };
  

  useLayoutEffect(() => {
    if (!auth.isSuperAdmin) navigate("/dashboard");
  }, [auth, navigate]);

  const handleCheckboxChange = (adminId) => {
    setSelectedAdmins((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(adminId)) {
        updatedSelected = prevSelected.filter((id) => id !== adminId);
      } else {
        updatedSelected = [...prevSelected, adminId];
      }
  
      const nonSuperAdminIds = admins
        .filter((admin) => !admin.isSuperAdmin)
        .map((admin) => admin._id);
  
      const allSelected = nonSuperAdminIds.every((id) => updatedSelected.includes(id));
      setSelectAll(allSelected);
  
      return updatedSelected;
    });
  };
  
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAdmins([]); 
    } else {
      const nonSuperAdminIds = admins
        .filter((admin) => !admin.isSuperAdmin)
        .map((admin) => admin._id);
      setSelectedAdmins(nonSuperAdminIds);
    }
    setSelectAll(!selectAll);
  };
  
  const rows = admins.map((admin) => [
    !admin.isSuperAdmin ?<input
        key={admin._id}
        className="form-check-input"
        type="checkbox"
        checked={selectedAdmins.includes(admin._id)}
        onChange={() => handleCheckboxChange(admin._id)}
      /> : null,
    admin.name,
    admin.email,
    admin.isBlocked === true ? (
      <span className="badge bg-danger">Blocked</span>
    ) : (
      <span className="badge bg-success">Active</span>
    ),
    <button
      key={admin._id}
      onClick={() => navigate(`/edit-admin/${admin._id}`)}
      className="btn btn-primary "
    >
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
                  <select
                    className="form-select form-control-sm"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {filter.map((key, i) => (
                      <option key={i} value={key.toLowerCase()}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {selectedAdmins.length ? (
                <button
                  onClick={() => updateSelectedAdminsStatus(false)}
                  className="btn btn-success mx-2"
                >
                  All Active
                </button>
              ) : null}
              {selectedAdmins.length ? (
                <button
                  onClick={() => updateSelectedAdminsStatus(true)}
                  className="btn btn-danger mx-2"
                >
                  All Inactive
                </button>
              ) : null}

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
              rows={rows}
              headers={[
                {
                  label: (
                    <input
                      className="form-check-input "
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  ),
                },
                { label: "Admin Name" },
                { label: "Admin Email" },
                { label: "Status" },
                { label: "Actions" },
                { label: "Sites" },
              ]}
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
