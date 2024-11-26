import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import ConfirmationModal from "../../comps/confirmation";
import useSetTimeout from "../../Hooks/useDebounce";
import useGetAllSites from "../../Hooks/useGetAllSites";
import DuplicateModal from "../../comps/duplicate";
import { deletePopupApi, duplicatePopupApi, updatePopupStatusApi } from "../../apis/popup-apis";
import Addnote from "../../comps/addnote";
import { listPopupNote } from "../notes/notes-message";
import { formatDateTime } from "../../utils/function";

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

  const [err, data, setRefresh] = useSetTimeout("popups", page - 1, limit, searchTerm, searchKey, statusFilter, siteId);

  useEffect(() => {
    if (data) {
      setPopups(data.popups);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", text: err.message });
    }
  }, [data, err, alert]);

  const updatePopupStatus = async (popupStatus) => {
    setLoading(true);
    try {
      const { status, data } = await updatePopupStatusApi(selectedPopups, popupStatus);
      if (status) {
        alert({
          type: "success",
          text: data.message,
        });
        setRefresh((r) => !r);
        setSelectedPopups([]);
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

  const duplicateSelectedPopup = async (selectedSites) => {
    if (!selectedPopups.length) {
      alert({ type: "warning", text: "Please select at least one popup to delete." });
      return;
    }
    setLoading(true);
    try {
      const { status, data } = await duplicatePopupApi(selectedPopups, selectedSites);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedPopups([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedPopups([]);
    }
  };

  const deleteSelectedPopup = async () => {
    if (!selectedPopups.length) {
      alert({ type: "warning", text: "Please select at least one popup to delete." });
      return;
    }
    setLoading(true);
    try {
      const { status, data } = await deletePopupApi(selectedPopups);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedPopups([]);
        setSelectAll(false);
        setStatusSelect("");
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
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
        setStatusSelect("");
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
      label: <input className="form-check-input " type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
    },
    { label: "Name" },
    { label: "Device Type" },
    { label: "Type" },
    { label: "Created Date" },
    { label: "Updated Date" },
    { label: "status" },
    { label: "Actions" },
    { label: "Sites" },
  ];

  const rows = popups.map((popup) => {
    const { _id, name, showOnDeviceType, contentType, isActive, site, createdAt, updatedAt } = popup;
    return {
      _id,
      checkedbox: (
        <input
          key={_id}
          className="form-check-input"
          type="checkbox"
          checked={selectedPopups.includes(_id)}
          onChange={() => handleCheckboxChange(_id)}
        />
      ),
      name,
      deviceType: showOnDeviceType === "mobile" ? "Mobile" : showOnDeviceType === "desktop" ? "Desktop" : "All",
      type: contentType === "guide" ? "Guide" : contentType === "casestudy" ? "Case Study" : "Basic",
      Created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt),
      status:
        isActive === true ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <span className="badge bg-danger">Inactive</span>
        ),
      action: (
        <div key={_id}>
          <button onClick={() => navigate(`/edit-popup/${_id}`)} className="btn btn-primary  me-1">
            Edit
          </button>
        </div>
      ),
      sites: `${site.name} (${site.host})`,
    };
  });

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
                {selectedPopups.length > 0 && (
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
                      <button onClick={() => updatePopupStatus(true)} className="btn btn-success mx-2">
                        Apply
                      </button>
                    )}
                    {statusSelect === "inactive" && (
                      <button onClick={() => updatePopupStatus(false)} className="btn btn-danger mx-2">
                        Apply
                      </button>
                    )}
                    <button onClick={() => setDupModalOpen(true)} className="btn btn-primary mx-2">
                      Duplicate Selected
                    </button>
                    <button onClick={() => setModalOpen(true)} className="btn btn-danger mx-2">
                      Delete Selected
                    </button>
                  </>
                )}
                <button onClick={() => navigate("/add-popup")} className="btn btn-primary">
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
      <Addnote des={listPopupNote} />
    </div>
  );
}
