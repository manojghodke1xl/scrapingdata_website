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
  const [selectedCaseStudies, setSelectedCaseStudies] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const searchAbleKeys = ["title"];

  const [err, data] = useSetTimeout(
    "casestudies",
    page - 1,
    limit,
    searchTerm,
    searchKey
  );

  useEffect(() => {
    if (data) {
      setCaseStudies(data.casestudies);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);



    const deleteSelectedCaseStudies = async () => {
      if (!selectedCaseStudies.length) {
        alert({
          type: "warning",
          title: "No Selection",
          text: "Please select at least one Case study to delete.",
        });
        return;
      }
  
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/casestudy`, {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("auth"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedCaseStudies }),
        });
  
        const { error } = await res.json();
  
        if (res.ok) {
          setCaseStudies((prevCaseStudies) =>
            prevCaseStudies.filter((casestudy) => !selectedCaseStudies.includes(casestudy._id))
          );
          alert({
            type: "success",
            title: "Deleted!",
            text: `Selected case study have been deleted.`,
          });
        } else {
          alert({ type: "danger", title: "Error!", text: error });
        }
      } catch (error) {
        alert({ type: "danger", title: "Error!", text: error.message });
      } finally {
        setLoading(false);
        setModalOpen(false);
        setSelectedCaseStudies([]);
      }
    };

  const handleCheckboxChange = (casestudyId) => {
    setSelectedCaseStudies((prevSelected) => {
      if (prevSelected.includes(casestudyId)) {
        return prevSelected.filter((id) => id !== casestudyId);
      } else {
        return [...prevSelected, casestudyId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCaseStudies([]);
    } else {
      setSelectedCaseStudies(caseStudies.map((casestudy) => casestudy._id));
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
    { label: "Title" },
    { label: "Status" },
    { label: "Actions" },
  ];

  const rows = caseStudies.map((casestudy) => [
    <input
      className="form-check-input"
      type="checkbox"
      checked={selectedCaseStudies.includes(casestudy._id)}
      onChange={() => handleCheckboxChange(casestudy._id)}
    />,
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
    </div>,
  ]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Case Study List</h3>
            <div className="card-options d-flex gap-2">
            {selectedCaseStudies.length ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn btn-danger"
                >
                  Delete Selected
                </button>
              ) : null}
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
        onConfirm={deleteSelectedCaseStudies}
        message="Are you sure you want to delete this casestudy?"
      />
    </div>
  );
}
