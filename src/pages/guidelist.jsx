import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation";
import useSetTimeout from "../Hooks/useDebounce";

export default function GuideList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [guides, setGuides] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [guideToDelete, setGuideToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const searchAbleKeys = ["title"];
  const filter = ["All", "Active", "Inactive"];

  const [err, data] = useSetTimeout(
    "guides",
    page - 1,
    limit,
    searchTerm,
    searchKey,
    statusFilter
  );

  useEffect(() => { 
    if (data) {
      setGuides(data.guides);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  const openDeleteModal = (id) => {
    setGuideToDelete(id);
    setModalOpen(true);
  };

  const deleteGuide = async () => {
    if (!guideToDelete) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/guide/${guideToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );
      const { error } = await res.json();
      if (res.ok) {
        setGuides((prevLists) =>
          prevLists.filter((list) => list._id !== guideToDelete)
        );
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
      setGuideToDelete(null);
    }
  };

  const headers = [
    { label: "Title" },
    { label: "status" },
    { label: "Actions" },
  ];

  const rows = guides.map((guide) => [
    guide.title,
    guide.isActive === true ? (
      <span className="badge bg-success">Active</span>
    ) : (
      <span className="badge bg-danger">Inactive</span>
    ),
    <div key={guide._id}>
      <button
        onClick={() => navigate(`/add-guide/${guide._id}`)}
        className="btn btn-primary  me-1"
      >
        Edit
      </button>
      <button
        onClick={() => openDeleteModal(guide._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    </div>,
  ]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Guides List</h3>
            <div className="card-options">
              <select
                className="form-select mx-2"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {filter.map((key, i) => (
                  <option key={i} value={key.toLowerCase()}>
                    {key}
                  </option>
                ))}
              </select>
              <button
                onClick={() => navigate("/add-guide")}
                className="btn btn-primary"
              >
                Add Guide
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <Table
              headers={headers}
              rows={rows}
              currentPage={page}
              totalPages={Math.ceil(guides.length / limit)}
              onPageChange={handlePageChange}
              entriesPerPage={limit}
              setSearchTerm={setSearchTerm}
              setSearchKey={setSearchKey}
              searchAbleKeys={searchAbleKeys}
              onEntriesChange={handleLimitChange}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteGuide}
        message="Are you sure you want to delete this guide?"
      />
    </div>
  );
}
