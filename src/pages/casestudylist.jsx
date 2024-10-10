import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation"; // Adjust the import path

export default function CaseStudyList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(8);
  const [casestudyToDelete, setCaseStudyToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0); // To track the total number of casestudys

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/casestudies?p=${page}&n=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );

      const { data, error } = await res.json();
      console.log(data);
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

  const headers = [{ label: "Title" }, { label: "Desc" }, { label: "Actions" }];

  const rows = lists.map((casestudy) => [
    casestudy.title,
    casestudy.desc,
    <div className="d-flex justify-content-between">
      <button
        onClick={() => navigate(`/add-casestudy/${casestudy._id}`)}
        className="btn btn-primary me-2"
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

  const handlePageChange = (newPage) => setPage(newPage);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

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

          <div className="table-responsive">
            <Table
              // headers={[]}
              headers={headers}
              // rows={[]}
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
        onConfirm={deleteCaseStudy}
        message="Are you sure you want to delete this casestudy?"
      />
    </div>
  );
}
