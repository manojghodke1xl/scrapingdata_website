import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation";
import useSetTimeout from "../Hooks/useDebounce";
import useGetAllSites from "../Hooks/useGetAllSites";
import DuplicateModal from "../comps/duplicate";
export default function PopupList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);
  const [popups, setPopups] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [dupModalOpen, setDupModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedPopups, setSelectedPopups] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [siteId, setSiteId] = useState("");
  const [statusSelect, setStatusSelect] = useState("");
  const allsites = useGetAllSites();

  const searchAbleKeys = ["Name", "Host"];
  const filter = ["Active", "Inactive"];
  const Status = ["Active", "Inactive"];

  const [err, data, setRefresh] = useSetTimeout(
    "popups",
    page - 1,
    limit,
    searchTerm,
    searchKey,
    statusFilter,
    siteId
  );
  useEffect(() => {
    if (data) {
      setPopups(data.popups);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  const updatePopupStatus = async (status) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/popup-status`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("auth"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedPopups, isActive: status }),
      });

      const { error } = await res.json();

      if (res.ok) {
        alert({
          type: "success",
          title: "Updated!",
          text: `Selected popups have been marked as ${
            status ? "Active" : "Inactive"
          }.`,
        });
        setRefresh((r) => !r);
        setSelectedPopups([]);
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

  const duplicateSelectedPopup = async (selectedSites) => {
    if (!selectedPopups.length) {
      alert({
        type: "warning",
        title: "No Selection",
        text: "Please select at least one popup to delete.",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/duplicate-popup`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("auth"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pids: selectedPopups, sids: selectedSites }),
        }
      );
      const { error } = await res.json();
      if (res.ok) {
        alert({
          type: "success",
          title: "Duplicated!",
          text: `Selected popups have been duplicated.`,
        });
        setRefresh((r) => !r);
        setSelectedPopups([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedPopups([]);
    }
  };
  const deleteSelectedPopup = async () => {
    if (!selectedPopups.length) {
      alert({
        type: "warning",
        title: "No Selection",
        text: "Please select at least one popup to delete.",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/popup`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("auth"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedPopups }),
      });
      const { error } = await res.json();
      if (res.ok) {
        alert({
          type: "success",
          title: "Deleted!",
          text: `Selected popups have been deleted.`,
        });
        setRefresh((r) => !r);
        setSelectedPopups([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedPopups([]);
    }
  };
  const handleCheckboxChange = (popupId) => {
    setSelectedPopups((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(popupId)) {
        updatedSelected = prevSelected.filter((id) => id !== popupId);
      } else {
        updatedSelected = [...prevSelected, popupId];
      }
      if (updatedSelected.length !== popups.length) {
        setSelectAll(false);
      }
      return updatedSelected;
    });
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPopups([]);
    } else {
      setSelectedPopups(popups.map((popup) => popup._id));
    }
    setSelectAll(!selectAll);
  };
  const headers = [
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
    { label: "Name" },
    { label: "Device Type" },
    { label: "Type" },
    { label: "status" },
    { label: "Actions" },
    { label: "Sites" },
  ];
  const rows = popups.map((popup) => [
    <input
      key={popup._id}
      className="form-check-input"
      type="checkbox"
      checked={selectedPopups.includes(popup._id)}
      onChange={() => handleCheckboxChange(popup._id)}
    />,
    popup.name,
    popup.showOnDeviceType,
    popup.contentType,
    popup.isActive === true ? (
      <span className="badge bg-success">Active</span>
    ) : (
      <span className="badge bg-danger">Inactive</span>
    ),
    <div key={popup._id}>
      <button
        onClick={() => navigate(`/edit-popup/${popup._id}`)}
        className="btn btn-primary  me-1"
      >
        Edit
      </button>
    </div>,
    `${popup.site.name} (${popup.site.host})`,
  ]);
  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Popups List</h3>
            <div className="card-options d-flex gap-2">
              <div className="card-options">
                <div className="text-secondary">
                  Filter
                  <div className="mx-2 d-inline-block">
                    <select
                      className="form-select form-control-sm"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      {filter.map((key, i) => (
                        <option key={i} value={key.toLowerCase()}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {selectedPopups.length ? (
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
                        <button
                          onClick={() => updatePopupStatus(true)}
                          className="btn btn-success mx-2"
                        >
                          Apply
                        </button>
                      )}
                      {statusSelect === "inactive" && (
                        <button
                          onClick={() => updatePopupStatus(false)}
                          className="btn btn-danger mx-2"
                        >
                          Apply
                        </button>
                      )}
                  </>
                ) : null}
                <button
                  onClick={() => navigate("/add-popup")}
                  className="btn btn-primary"
                >
                  Add Popup
                </button>
              </div>
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
              allsites={allsites}
              setSiteId={setSiteId}
              searchAbleKeys={searchAbleKeys}
              onEntriesChange={(newLimit) => {
                setLimit(newLimit);
              }}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteSelectedPopup}
        message="Are you sure you want to delete this Popup?"
      />
      <DuplicateModal
        allsites={allsites}
        isOpen={dupModalOpen}
        onClose={setDupModalOpen}
        onConfirm={duplicateSelectedPopup}
        title="Duplicate Popups"
        confirmText="Duplicate"
      />
    </div>
  );
}
