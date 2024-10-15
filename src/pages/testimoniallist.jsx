import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation";
import useSetTimeout from "../Hooks/useDebounce";

export default function TestimonialList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [testimonials, setTestimonials] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedTestimonials, setSelectedTestimonials] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const searchAbleKeys = ["name"];

  const [err, data] = useSetTimeout(
    "testimonials",
    page - 1,
    limit,
    searchTerm,
    searchKey
  );

  useEffect(() => {
    if (data) {
      setTestimonials(data.testimonials);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  const deleteSelectedTestimonial = async () => {
    if (!selectedTestimonials.length) {
      alert({
        type: "warning",
        title: "No Selection",
        text: "Please select at least one enquiry to delete.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/testimonial`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("auth"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedTestimonials }),
      });

      const { error } = await res.json();

      if (res.ok) {
        setTestimonials((prevEnquiries) =>
          prevEnquiries.filter((enq) => !selectedTestimonials.includes(enq._id))
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
      setSelectedTestimonials([]);
    }
  };

  const handleCheckboxChange = (testimonialId) => {
    setSelectedTestimonials((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(testimonialId)) {
        updatedSelected = prevSelected.filter((id) => id !== testimonialId);
      } else {
        updatedSelected = [...prevSelected, enqId];
      }
      if (updatedSelected.length !== testimonials.length) {
        setSelectAll(false);
      }

      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTestimonials([]);
    } else {
      setSelectedTestimonials(
        testimonials.map((testimonial) => testimonial._id)
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
    { label: "Status" },
    { label: "Actions" },
  ];

  const rows = testimonials.map((testimonial) => [
    <input
      className="form-check-input"
      type="checkbox"
      checked={selectedTestimonials.includes(testimonial._id)}
      onChange={() => handleCheckboxChange(testimonial._id)}
    />,
    testimonial.name,
    testimonial.isActive === true ? (
      <span className="badge bg-success">Active</span>
    ) : (
      <span className="badge bg-danger">Inactive</span>
    ),
    <div key={testimonial._id}>
      <button
        onClick={() => navigate(`/add-testimonial/${testimonial._id}`)}
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
            <h3 className="card-title">All Testimonials List</h3>
            <div className="card-options d-flex gap-2">
              {selectedTestimonials.length ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn btn-danger"
                >
                  Delete Selected
                </button>
              ) : null}
              <button
                onClick={() => navigate("/add-testimonial")}
                className="btn btn-primary"
              >
                Add Testimonial
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
        onConfirm={deleteSelectedTestimonial}
        message="Are you sure you want to delete this Testimonial?"
      />
    </div>
  );
}
