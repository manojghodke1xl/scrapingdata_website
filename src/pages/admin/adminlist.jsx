import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import useSetTimeout from "../../Hooks/useDebounce";
import useGetAllSites from "../../Hooks/useGetAllSites";
import { updateAdminStatusApi } from "../../apis/admin-apis";
import Addnote from "../../comps/addnote";
import { listAdminNote } from "../notes/notes-message";
import { formatDateTime } from "../../utils/function";
import TruncatableField from "../../comps/modals/truncatableField";

export default function AdminList() {
  const navigate = useNavigate();
  const { auth, alert, setLoading } = useContext(GlobalContext);

  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusSelect, setStatusSelect] = useState("");
  const [siteId, setSiteId] = useState("");
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const allsites = useGetAllSites();

  const searchAbleKeys = ["Name", "Email"];
  const filter = ["Active", "Inactive"];
  const Status = ["Active", "Block"];

  const [err, data, setRefresh] = useSetTimeout("admins", page - 1, limit, searchTerm, searchKey, statusFilter, siteId);

  useEffect(() => {
    if (data) {
      setAdmins(data.admins);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", text: err.message });
    }
  }, [data, err, alert]);

  const updateSelectedAdminsStatus = async (userStatus) => {
    setLoading(true);
    try {
      const { status, data } = await updateAdminStatusApi(selectedAdmins, userStatus);

      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedAdmins([]);
        setSelectAll(false);
        setStatusSelect("");
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
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
        setStatusSelect("");
      } else {
        updatedSelected = [...prevSelected, adminId];
      }
      const nonSuperAdminIds = admins.filter((admin) => !admin.isSuperAdmin).map((admin) => admin._id);
      const allSelected = nonSuperAdminIds.every((id) => updatedSelected.includes(id));
      setSelectAll(allSelected);
      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAdmins([]);
    } else {
      const nonSuperAdminIds = admins.filter((admin) => !admin.isSuperAdmin).map((admin) => admin._id);
      setSelectedAdmins(nonSuperAdminIds);
    }
    setSelectAll(!selectAll);
  };

  const headers = [
    {
      label: <input className="form-check-input " type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
    },
    { label: "Admin Name" },
    { label: "Admin Email" },
    { label: "Created Date" },
    { label: "Updated Date" },
    { label: "Status" },
    { label: "Actions" },
    { label: "Sites" },
  ];

  const rows = admins.map((admin) => {
    const { _id, name, email, isBlocked, isSuperAdmin, createdAt, updatedAt } = admin;
    return {
      _id,
      checkedBox: !isSuperAdmin ? (
        <input
          key={_id}
          className="form-check-input"
          type="checkbox"
          checked={selectedAdmins.includes(_id)}
          onChange={() => handleCheckboxChange(_id)}
        />
      ) : null,
      name: <TruncatableField title="Name" content={name} maxLength={20} />,
      email: <TruncatableField title="Email" content={email} maxLength={20} />,
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt),
      status:
        isBlocked === true ? (
          <span className="badge bg-danger">Blocked</span>
        ) : (
          <span className="badge bg-success">Active</span>
        ),
      actions: (
        <button key={_id} onClick={() => navigate(`/edit-admin/${_id}`)} className="btn btn-primary ">
          Edit
        </button>
      ),
      sites: (
        <TruncatableField
          title={"Sites"}
          content={
            isSuperAdmin
              ? allsites.map((s) => `${s.name} (${s.host})`).join(", ")
              : admin.sites.map((s) => `${s.name} (${s.host})`).join(", ")
          }
          maxLength={20}
        />
      ),
    };
  });

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
                    <option value={""}>All</option>
                    {filter.map((key, i) => (
                      <option key={i} value={key.toLowerCase()}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {selectedAdmins.length ? (
                <>
                  <div className="text-secondary">
                    Status
                    <div className="mx-2 d-inline-block">
                      <select className="form-select form-control-sm" onChange={(e) => setStatusSelect(e.target.value)}>
                        <option value="">Select</option>
                        {Status.map((key, i) => (
                          <option key={i} value={key.toLowerCase()}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {statusSelect === "active" && (
                    <button onClick={() => updateSelectedAdminsStatus(false)} className="btn btn-success mx-2">
                      Apply
                    </button>
                  )}
                  {statusSelect === "block" && (
                    <button onClick={() => updateSelectedAdminsStatus(true)} className="btn btn-danger mx-2">
                      Apply
                    </button>
                  )}
                </>
              ) : null}

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
      <Addnote des={listAdminNote} />
    </div>
  );
}
