import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation"; // Adjust the import path

export default function CaseStudyList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [casestudyToDelete, setCaseStudyToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0); // To track the total number of casestudys

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/casestudies?p=${page - 1}&n=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );

      const { data, error } = await res.json();
      if (res.ok) {
        setLists(data.casestudies);
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
    setCaseStudyToDelete(id);
    setModalOpen(true);
  };

  const deleteCaseStudy = async () => {
    if (!casestudyToDelete) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/casestudy/${casestudyToDelete}`,
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
          prevLists.filter((list) => list._id !== casestudyToDelete)
        );
        alert({
          type: "success",
          title: "Deleted!",
          text: "CaseStudy has been deleted.",
        });
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false); // Close the modal after deletion
      setCaseStudyToDelete(null); // Reset the casestudy ID
    }
  };

  const headers = [{ label: "Title" }, { label: "Status" }, { label: "Actions" }];

  const rows = lists.map((casestudy) => [
    casestudy.title,
    casestudy.isActive === true ? (
      <span className="badge bg-success">Active</span>  
    ) : (
      <span className="badge bg-danger">Inactive</span>
    ),
    <div>
      <button
        onClick={() => navigate(`/add-casestudy/${casestudy._id}`)}
        className="btn btn-primary me-1"
      >
        Edit
      </button>
      <button
        onClick={() => openDeleteModal(casestudy._id)}
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
            <h3 className="card-title">All Case Study List</h3>
            <div className="card-options">
              <button
                onClick={() => navigate("/add-casestudy")}
                className="btn btn-primary"
              >
                Add CaseStudy
              </button>
            </div>
          </div>

          <div className="table-responsive  ">
            <Table
              headers={ headers}
              rows={rows}
              currentPage={page}
              totalPages={Math.ceil(lists.length / limit)}
              onPageChange={setPage}
              entriesPerPage={limit}
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
        onConfirm={deleteCaseStudy}
        message="Are you sure you want to delete this casestudy?"
      />
    </div>
  );
}
