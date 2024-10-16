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
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedGuides, setSelectedGuides] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const searchAbleKeys = ["title"];

  const [err, data] = useSetTimeout(
    "guides",
    page - 1,
    limit,
    searchTerm,
    searchKey
  );

  useEffect(() => {
    if (data) {
      setGuides(data.guides);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  const deleteSelectedGuides = async () => {
    if (!selectedGuides.length) {
      alert({
        type: "warning",
        title: "No Selection",
        text: "Please select at least one enquiry to delete.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/guide`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("auth"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedGuides }),
      });

      const { error } = await res.json();

      if (res.ok) {
        setGuides((prevEnquiries) =>
          prevEnquiries.filter((enq) => !selectedGuides.includes(enq._id))
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
      setSelectedGuides([]);
    }
  };

  const handleCheckboxChange = (guideId) => {
    setSelectedGuides((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(guideId)) {
        updatedSelected = prevSelected.filter((id) => id !== guideId);
      } else {
        updatedSelected = [...prevSelected, guideId];
      }
      if (updatedSelected.length !== guides.length) {
        setSelectAll(false);
      }
  
      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedGuides([]);
    } else {
      setSelectedGuides(guides.map((guide) => guide._id));
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
    { label: "status" },
    { label: "Actions" },
  ];

  const rows = guides.map((guide) => [
    <input
      className="form-check-input"
      type="checkbox"
      checked={selectedGuides.includes(guide._id)}
      onChange={() => handleCheckboxChange(guide._id)}
    />,
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
            <div className="card-options d-flex gap-2">
              {selectedGuides.length ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn btn-danger"
                >
                  Delete Selected
                </button>
              ) : null}
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
        onConfirm={deleteSelectedGuides}
        message="Are you sure you want to delete this guide?"
      />
    </div>
  );
}
