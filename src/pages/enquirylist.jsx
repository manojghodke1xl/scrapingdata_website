import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import ConfirmationModal from "../comps/confirmation";
import useSetTimeout from "../Hooks/useDebounce";
import useGetAllSites from "../Hooks/useGetAllSites";

export default function EnquiryList() {
  const { alert, setLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [siteId, setSiteId] = useState("");
  const allsites = useGetAllSites();

  const searchAbleKeys = ["name", "email", "mobile", "service", "subject", "site"];

  const [err, data] = useSetTimeout("enquiries", page - 1, limit, searchTerm, searchKey, siteId);

  useEffect(() => {
    if (data) {
      setEnquiries(data.enquiries);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  const deleteEnquiry = async () => {
    if (!enquiryToDelete) return;

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/enquiry/${enquiryToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { error } = await res.json();

      if (res.ok) {
        setEnquiries((prevEnquiries) => prevEnquiries.filter((enq) => enq._id !== enquiryToDelete));
        alert({
          type: "success",
          title: "Deleted!",
          text: "Enquiry has been deleted.",
        });
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setEnquiryToDelete(null);
    }
  };

  const headers = [
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
    enq.name,
    enq.email,
    enq.mobile,
    enq.service,
    enq.subject,
    enq.message,
    enq.site.name,
    <div key={enq._id}>
      <button onClick={() => navigate(`/enquiry/${enq._id}`)} className="btn btn-primary me-1">
        View
      </button>
      <button
        onClick={() => {
          setEnquiryToDelete(enq._id);
          setModalOpen(true);
        }}
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
            <h3 className="card-title">All Enquiries</h3>
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
              allsites={allsites}
              setSiteId={setSiteId}
              searchAbleKeys={searchAbleKeys}
              onEntriesChange={(newLimit) => {
                setLimit(newLimit);
              }}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteEnquiry}
        message="Are you sure you want to delete this enquiry? If you proceed, you will lose this record."
      />
    </div>
  );
}
