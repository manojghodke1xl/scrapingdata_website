import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table"; 
import ConfirmationModal from "../comps/confirmation"; // Import the ConfirmationModal

export default function MailingList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(0); 
  const [limit, setLimit] = useState(8);
  const [mailingToDelete, setMailingToDelete] = useState(null); // State for the mailing to delete
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [totalCount, setTotalCount] = useState(0); // To track the total number of guides

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/lists?p=${page}&n=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );
      const { data, error } = await res.json();
      if (res.ok) {
        setLists(data.lists);
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

  const headers = [
    { label: "Customer Email" },
    { label: "Site Name" },
    { label: "Actions" },
  ];

  const rows = lists.map((lst) => [
    lst.email,
    lst.site.name,
    <div className="d-flex">
      <button
        onClick={() => navigate(`/mailing/${lst._id}`)}
        className="btn btn-primary w-50 me-1" // Adjusted for spacing
      >
        View
      </button>
      <button 
        onClick={() => openDeleteModal(lst._id)} 
        className="btn btn-danger w-50"
      >
        Delete
      </button>
    </div>,
  ]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleLimitChange = (newLimit) => setLimit(newLimit);

  const openDeleteModal = (id) => {
    setMailingToDelete(id);
    setModalOpen(true);
  };

  const deleteMailingList = async () => {
    if (!mailingToDelete) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/lists/${mailingToDelete}`, // Ensure your API endpoint is correct
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
          prevLists.filter((list) => list._id !== mailingToDelete)
        );
        alert({
          type: "success",
          title: "Deleted!",
          text: "Mailing list has been deleted.",
        });
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false); // Close the modal after deletion
      setMailingToDelete(null); // Reset the mailing ID
    }
  };

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Mailing Lists</h3>
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteMailingList}
        message="Are you sure you want to delete this mailing list? "
      />
    </div>
  );
}
