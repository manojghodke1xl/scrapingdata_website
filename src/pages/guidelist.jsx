import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation"; // Adjust the import path

export default function GuideList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [guideToDelete, setGuideToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0); // To track the total number of guides

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/guides?p=${page - 1}&n=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );

      const { data, error } = await res.json();
      if (res.ok) {
        setLists(data.guides);
        setTotalCount(data.count);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })()
      .catch((error) =>
        alert({ type: "danger", title: "Error !", text: error.message })
      )
      .finally(() => setLoading(false));
  }, [alert, limit, page, setLoading]);

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
        setLists((prevLists) =>
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

  const headers = [{ label: "Title" }, {label: "status"}, { label: "Actions" }];

  const rows = lists.map((guide) => [
    guide.title,
    guide.isActive === true ? (
      <span className="badge bg-success">Active</span>  
    ) : (
      <span className="badge bg-danger">Inactive</span>
    ),
    <div>
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
              totalPages={Math.ceil(lists.length / limit)}
              onPageChange={handlePageChange}
              entriesPerPage={limit}
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
