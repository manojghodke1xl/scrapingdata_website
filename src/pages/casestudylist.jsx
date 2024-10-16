import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation";
import useSetTimeout from "../Hooks/useDebounce";

export default function CaseStudyList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [caseStudies, setCaseStudies] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [casestudyToDelete, setCaseStudyToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const searchAbleKeys = ["title"];
  const filter = ["All", "Active", "Inactive"];

  const [err, data] = useSetTimeout(
    "casestudies",
    page - 1,
    limit,
    searchTerm,
    searchKey,
    statusFilter
  );

  useEffect(() => {
    if (data) {
      setCaseStudies(data.casestudies);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

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
        setCaseStudies((prevLists) =>
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
      setModalOpen(false);
      setCaseStudyToDelete(null);
    }
  };

  const headers = [
    { label: "Title" },
    { label: "Status" },
    { label: "Actions" },
  ];

  const rows = caseStudies.map((casestudy) => [
    casestudy.title,

    casestudy.isActive === true ? (
      <span className="badge bg-success">Active</span>
    ) : (
      <span className="badge bg-danger">Inactive</span>
    ),
    <div key={casestudy._id}>
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
                onClick={() => navigate("/add-casestudy")}
                className="btn btn-primary"
              >
                Add CaseStudy
              </button>
            </div>
          </div>

          <div className="table-responsive  ">
            <Table
              headers={headers}
              rows={rows}
              currentPage={page}
              totalPages={Math.ceil(caseStudies.length / limit)}
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
        onConfirm={deleteCaseStudy}
        message="Are you sure you want to delete this casestudy?"
      />
    </div>
  );
}
