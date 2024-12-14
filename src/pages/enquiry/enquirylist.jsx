import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import ConfirmationModal from "../../comps/modals/confirmation";
import useSetTimeout from "../../Hooks/useDebounce";
import useGetAllSites from "../../Hooks/useGetAllSites";
import { deleteEnquiryApi } from "../../apis/enquiry-apis";
import Addnote from "../../comps/addnote";
import { listEnquiryNote } from "../notes/notes-message";
import { formatDateTime } from "../../utils/function";
import TruncatableField from "../../comps/modals/truncatableField";
import IntegrationModal from "../../comps/modals/integrationModal";
import { enquiryIntegrationData } from "../../utils/integrationData";

export default function EnquiryList() {
  const { alert, setLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [integrationModalOpen, setIntegrationModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedEnquiries, setSelectedEnquiries] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [siteId, setSiteId] = useState("");
  const allsites = useGetAllSites();

  const searchAbleKeys = ["Name", "Email", "Mobile", "Service", "Subject", "Site"];

  const [err, data, setRefresh] = useSetTimeout("enquiries", page - 1, limit, searchTerm, searchKey, "", siteId);

  useEffect(() => {
    if (data) {
      setEnquiries(data.enquiries);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", text: err.message });
    }
  }, [data, err, alert]);

  const deleteSelectedEnquiries = async () => {
    if (!selectedEnquiries.length)
      return alert({
        type: "warning",
        text: "Please select at least one enquiry to delete.",
      });

    setLoading(true);
    try {
      const { status, data } = await deleteEnquiryApi(selectedEnquiries);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedEnquiries([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
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

      if (updatedSelected.length === enquiries.length) {
        setSelectAll(true);
      } else {
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
      label: <input className="form-check-input" type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
    },
    { label: "Customer Name" },
    { label: "Customer Email" },
    { label: "Customer Mobile" },
    { label: "Enquiry Service" },
    { label: "Enquiry Subject" },
    { label: "Enquiry Message" },
    { label: "Site" },
    { label: "Created Date" },
    { label: "Updated Date" },
    { label: "Actions" },
  ];

  const rows = enquiries.map((enq) => {
    const { _id, name, email, ccode, mobile, service, subject, message, createdAt, updatedAt, site } = enq;
    return {
      _id,
      checkbox: (
        <input
          key={_id}
          className="form-check-input"
          type="checkbox"
          checked={selectedEnquiries.includes(_id)}
          onChange={() => handleCheckboxChange(_id)}
        />
      ),
      name: <TruncatableField title={"Customer Name"} content={name ?? ""} maxLength={20} />,
      email: <TruncatableField title={"Customer Email"} content={email ?? ""} maxLength={20} />,
      mobile: <TruncatableField title={"Mobile"} content={`${ccode ?? ""} ${mobile ?? ""}`} maxLength={15} />,
      service: <TruncatableField title={"Enquiry Service"} content={service ?? ""} maxLength={20} />,
      subject: <TruncatableField title={"Enquiry Subject"} content={subject ?? ""} maxLength={20} />,
      message: <TruncatableField title={"Enquiry Message"} content={message ?? ""} maxLength={50} />,
      siteName: <TruncatableField title={"Site"} content={`${site?.name} (${site?.host}) `} maxLength={20} />,
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt),
      action: (
        <div key={_id}>
          <button onClick={() => navigate(`/enquiry/${_id}`)} className="btn btn-primary me-1">
            View
          </button>
        </div>
      ),
    };
  });

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Enquiries</h3>
            <div className="card-options">
              <button className="btn btn-primary mx-2" onClick={() => setIntegrationModalOpen(true)}>
                Integration guide
              </button>
              {selectedEnquiries.length ? (
                <button onClick={() => setModalOpen(true)} className="btn btn-danger">
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

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteSelectedEnquiries}
        message={`Are you sure you want to delete selected enquiry? This action cannot be undone.`}
      />
      <IntegrationModal
        isOpen={integrationModalOpen}
        onClose={() => setIntegrationModalOpen(false)}
        title={enquiryIntegrationData.title}
        url={enquiryIntegrationData.url}
        method={enquiryIntegrationData.method}
        bodyParams={enquiryIntegrationData.bodyParams}
        manditoryParams={enquiryIntegrationData.manditoryParams}
        headers={enquiryIntegrationData.headers}
        responseDetails={enquiryIntegrationData.responseDetails}
      />
      <Addnote des={listEnquiryNote} />
    </div>
  );
}
