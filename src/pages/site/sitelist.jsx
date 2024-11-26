import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import useSetTimeout from "../../Hooks/useDebounce";
import Addnote from "../../comps/addnote";
import { listWebsiteNote } from "../notes/notes-message";
import { formatDateTime } from "../../utils/function";

export default function SiteList() {
  const navigate = useNavigate();
  const { alert, auth, setLoading } = useContext(GlobalContext);

  const [sites, setSites] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedSites, setSelectedSites] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [statusSelect, setStatusSelect] = useState("");

  const searchAbleKeys = ["Name", "Host"];
  const filter = ["Active", "Inactive"];
  const Status = ["Active", "Inactive"];

  const [err, data, setRefresh] = useSetTimeout("sites", page - 1, limit, searchTerm, searchKey, statusFilter, "");

  useEffect(() => {
    if (data) {
      setSites(data.sites);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  const updateSiteStatus = async (status) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/site-status`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("auth"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedSites, isActive: status }),
      });

      const { error } = await res.json();

      if (res.ok) {
        setRefresh((r) => !r);
        alert({
          type: "success",
          title: "Updated!",
          text: `Selected site(s) have been marked as ${status ? "Active" : "Inactive"}.`,
        });

        setSelectedSites([]);
        setSelectAll(false);
        setStatusSelect("");
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (siteId) => {
    setSelectedSites((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(siteId)) {
        updatedSelected = prevSelected.filter((id) => id !== siteId);
        setStatusSelect("");
      } else {
        updatedSelected = [...prevSelected, siteId];
      }
      if (updatedSelected.length === sites.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }

      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSites([]);
    } else {
      setSelectedSites(sites.map((site) => site._id));
    }
    setSelectAll(!selectAll);
  };

  const headers = [
    {
      label: <input className="form-check-input " type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
    },
    { label: "Keys" },
    { label: "Website Name" },
    { label: "Web Address" },
    { label: "Status" },
    { label: "Created Date" },
    { label: "Updated Date" },
    { label: "Actions" },
  ];

  const rows = sites.map((site) => {
    const { _id, name, host, isActive, createdAt, updatedAt } = site;

    return {
      _id,
      checkedbox: (
        <input
          key={site._id}
          className="form-check-input"
          type="checkbox"
          checked={selectedSites.includes(site._id)}
          onChange={() => handleCheckboxChange(site._id)}
        />
      ),
      keys: _id,
      name,
      host,
      status:
        isActive === true ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <span className="badge bg-danger">Inactive</span>
        ),
      Created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt),

      action: (
        <button key={site._id} onClick={() => navigate(`/edit-site/${site._id}`)} className="btn btn-primary">
          Edit
        </button>
      ),
    };
  });

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Websites</h3>
            <div className="card-options">
              {auth.isSuperAdmin && (
                <>
                  <div className="text-secondary">
                    Filter
                    <div className="mx-2 d-inline-block">
                      <select className="form-select form-control-sm" onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">All</option>
                        {filter.map((key, i) => (
                          <option key={i} value={key.toLowerCase()}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {selectedSites.length ? (
                    <>
                      <div className="text-secondary">
                        Status
                        <div className="mx-2 d-inline-block">
                          <select
                            className="form-select form-control-sm"
                            onChange={(e) => setStatusSelect(e.target.value)}
                          >
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
                        <button onClick={() => updateSiteStatus(true)} className="btn btn-success mx-2">
                          Apply
                        </button>
                      )}
                      {statusSelect === "inactive" && (
                        <button onClick={() => updateSiteStatus(false)} className="btn btn-danger mx-2">
                          Apply
                        </button>
                      )}
                    </>
                  ) : null}

                  <button onClick={() => navigate("/add-site")} className="btn btn-primary ">
                    Add Site
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="table-responsive">
            <Table
              headers={headers}
              rows={rows}
              currentPage={page}
              totalPages={Math.ceil(totalCount / limit)}
              onPageChange={setPage}
              entriesPerPage={limit}
              setSearchTerm={setSearchTerm}
              setSearchKey={setSearchKey}
              searchAbleKeys={searchAbleKeys}
              onEntriesChange={(newLimit) => setLimit(newLimit)}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
      <Addnote des={listWebsiteNote} />
    </div>
  );
}
