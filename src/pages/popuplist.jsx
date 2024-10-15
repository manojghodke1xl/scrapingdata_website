import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation";
import useSetTimeout from "../Hooks/useDebounce";

export default function PopupList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [popups, setPopups] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [popupToDelete, setPopupToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedPopups, setSelectedPopups] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const searchAbleKeys = ["name", "host"];

  const [err, data] = useSetTimeout(
    "Popups",
    page - 1,
    limit,
    searchTerm,
    searchKey
  );

  const openDeleteModal = (id) => {
    setPopupToDelete(id);
    setModalOpen(true);
  };

  useEffect(() => {
    if (data) {
      setPopups(data.popups);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  const deleteSelectedPopup = async () => {
    if (!selectedPopups.length) {
      alert({
        type: "warning",
        title: "No Selection",
        text: "Please select at least one enquiry to delete.",
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
        setPopups((prevEnquiries) =>
          prevEnquiries.filter((enq) => !selectedPopups.includes(enq._id))
        );
        alert({
          type: "success",
          title: "Deleted!",
          text: `Selected enquiry have been deleted.`,
        });
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
        updatedSelected = [...prevSelected, enqId];
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
      setSelectedPopups(
        popups.map((popup) => popup._id)
      );
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
  ];

  const rows = popups.map((popup) => [
    <input
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
        onClick={() => navigate(`/add-popup/${popup._id}`)}
        className="btn btn-primary  me-1"
      >
        Edit
      </button>
      <button
        onClick={() => openDeleteModal(popup._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    </div>,
  ]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Popups List</h3>
            <div className="card-options d-flex gap-2">
            {selectedPopups.length ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn btn-danger"
                >
                  Delete Selected
                </button>
              ) : null}
              <button
                onClick={() => navigate("/add-popup")}
                className="btn btn-primary"
              >
                Add Popup
              </button>
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
    </div>
  );
}
