import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation";
import useSetTimeout from "../Hooks/useDebounce";

export default function EnquiryList() {
  const { alert, setLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedEnquiries, setSelectedEnquiries] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const searchAbleKeys = [
    "name",
    "email",
    "mobile",
    "service",
    "subject",
    "site",
  ];

  const [err, data] = useSetTimeout(
    "enquiries",
    page - 1,
    limit,
    searchTerm,
    searchKey
  );

  useEffect(() => {
    if (data) {
      setEnquiries(data.enquiries);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  const deleteSelectedEnquiries = async () => {
    if (!selectedEnquiries.length) {
      alert({
        type: "warning",
        title: "No Selection",
        text: "Please select at least one enquiry to delete.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/enquiry`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("auth"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedEnquiries }),
      });

      const { error } = await res.json();

      if (res.ok) {
        setEnquiries((prevEnquiries) =>
          prevEnquiries.filter((enq) => !selectedEnquiries.includes(enq._id))
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
      setSelectedEnquiries([]);
    }
  };

  const handleCheckboxChange = (enqId) => {
    setSelectedEnquiries((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(enqId)) {
        updatedSelected = prevSelected.filter((id) => id !== enqId);
      } else {
        updatedSelected = [...prevSelected, enqId];
      }
      if (updatedSelected.length !== enquiries.length) {
        setSelectAll(false);
      }
  
      return updatedSelected;
    });
  };
  

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEnquiries([]); 
    } else {
      setSelectedEnquiries(enquiries.map((enq) => enq._id)); 
    }
    setSelectAll(!selectAll); 
  };

  const headers = [
    {
      label: (
        <input
        className="form-check-input"
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
    },
    { label: "Customer Name" },
    { label: "Customer Email" },
    { label: "Customer Mobile" },
    { label: "Enquiry Service" },
    { label: "Enquiry Subject" },
    { label: "Enquiry Message" },
    { label: "Site Name" },
    { label: "Actions" }, 
  ];

  const rows = enquiries.map((enq) => [
    <input
      className="form-check-input"
      type="checkbox"
      checked={selectedEnquiries.includes(enq._id)}
      onChange={() => handleCheckboxChange(enq._id)}
    />,
    enq.name,
    enq.email,
    enq.mobile,
    enq.service,
    enq.subject,
    enq.message,
    enq.site.name,
    <button
      onClick={() => navigate(`/enquiry/${enq._id}`)}
      className="btn btn-primary me-1"
    >
      View
    </button>,
  ]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Enquiries</h3>
            <div className="card-options">
              {selectedEnquiries.length ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn btn-danger"
                >
                  Delete Selected
                </button>
              ) : (
                ""
              )}
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
        onConfirm={deleteSelectedEnquiries}
        message={`Are you sure you want to delete selected enquiry? This action cannot be undone.`}
      />
    </div>
  );
}
