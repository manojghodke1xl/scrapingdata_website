import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation";
import useSetTimeout from "../Hooks/useDebounce";
import useGetAllSites from "../Hooks/useGetAllSites";

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
  const [siteId, setSiteId] = useState("");
  const allsites = useGetAllSites();

  const searchAbleKeys = ["name", "host"];

  const [err, data] = useSetTimeout("popups", page - 1, limit, searchTerm, searchKey, siteId);

  const openDeleteModal = (id) => {
    setPopupToDelete(id);
    setModalOpen(true);
  };

  const deletePopup = async () => {
    if (!popupToDelete) return;

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/popup/${popupToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { error } = await res.json();
      if (res.ok) {
        setPopups((prevLists) => prevLists.filter((list) => list._id !== popupToDelete));
        alert({
          type: "success",
          title: "Deleted!",
          text: "Guide has been deleted.",
        });
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setPopupToDelete(null);
    }
  };

  useEffect(() => {
    if (data) {
      setPopups(data.popups);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  const headers = [
    { label: "Name" },
    { label: "Device Type" },
    { label: "Type" },
    { label: "status" },
    { label: "Actions" },
    { label: "Sites" },
  ];

  const rows = popups.map((popup) => [
    popup.name,
    popup.showOnDeviceType,
    popup.contentType,
    popup.isActive === true ? (
      <span className="badge bg-success">Active</span>
    ) : (
      <span className="badge bg-danger">Inactive</span>
    ),
    <div key={popup._id}>
      <button onClick={() => navigate(`/add-popup/${popup._id}`)} className="btn btn-primary  me-1">
        Edit
      </button>
      <button onClick={() => openDeleteModal(popup._id)} className="btn btn-danger">
        Delete
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
            <div className="card-options">
              <button onClick={() => navigate("/add-popup")} className="btn btn-primary">
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
        onConfirm={deletePopup}
        message="Are you sure you want to delete this guide?"
      />
    </div>
  );
}
