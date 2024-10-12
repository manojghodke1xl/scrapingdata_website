import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation"; 

export default function TestimonialList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [testimonials, setTestimonials] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0); 

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/testimonials?p=${page - 1}&n=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );

      const { data, error } = await res.json();
      if (res.ok) {
        setTestimonials(data.testimonials);
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
    setTestimonialToDelete(id);
    setModalOpen(true);
  };

  const deleteTestimonial = async () => {
    if (!testimonialToDelete) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/testimonial/${testimonialToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );
      const { error } = await res.json();
      if (res.ok) {
        setTestimonials((prevLists) =>
          prevLists.filter((list) => list._id !== testimonialToDelete)
        );
        alert({
          type: "success",
          title: "Deleted!",
          text: "Testimonial has been deleted.",
        });
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false); 
      setTestimonialToDelete(null); 
    }
  };

  const headers = [{ label: "Name" }, { label: "Actions" }];

  const rows = testimonials.map((testimonial) => [
    testimonial.name,
    <div>
      <button
        onClick={() => navigate(`/add-testimonial/${testimonial._id}`)}
        className="btn btn-primary me-1"
      >
        Edit
      </button>
      <button
        onClick={() => openDeleteModal(testimonial._id)}
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
            <h3 className="card-title">All Testimonials List</h3>
            <div className="card-options">
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
        onConfirm={deleteTestimonial}
        message="Are you sure you want to delete this Testimonial?"
      />
    </div>
  );
}
