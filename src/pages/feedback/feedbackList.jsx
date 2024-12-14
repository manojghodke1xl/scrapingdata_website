import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import ConfirmationModal from "../../comps/modals/confirmation";
import useSetTimeout from "../../Hooks/useDebounce";
import useGetAllSites from "../../Hooks/useGetAllSites";
import { formatDateTime } from "../../utils/function";
import TruncatableField from "../../comps/modals/truncatableField";
import { deleteFeedbackApi } from "../../apis/feedback-apis";
import IntegrationModal from "../../comps/modals/integrationModal";
import { feedbackIntegrationData } from "../../utils/integrationData";

const FeedbackList = () => {
  const { alert, setLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [integrationModalOpen, setIntegrationModalOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedfeedbacks, setSelectedfeedbacks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [siteId, setSiteId] = useState("");
  const allsites = useGetAllSites();

  const searchAbleKeys = ["Name", "Email", "Mobile", "Service", "Subject", "Site"];

  const [err, data, setRefresh] = useSetTimeout("feedback", page - 1, limit, searchTerm, searchKey, "", siteId);

  useEffect(() => {
    if (data) {
      setFeedbacks(data.feedbacks);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", text: err.message });
    }
  }, [data, err, alert]);

  const deleteSelectedFeedbacks = async () => {
    if (!selectedfeedbacks.length)
      return alert({
        type: "warning",
        text: "Please select at least one feedback to delete.",
      });

    setLoading(true);
    try {
      const { status, data } = await deleteFeedbackApi(selectedfeedbacks);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedfeedbacks([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedfeedbacks([]);
    }
  };

  const handleCheckboxChange = (fdbId) => {
    setSelectedfeedbacks((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(fdbId)) {
        updatedSelected = prevSelected.filter((id) => id !== fdbId);
      } else {
        updatedSelected = [...prevSelected, fdbId];
      }

      if (updatedSelected.length === feedbacks.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }

      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedfeedbacks([]);
    } else {
      setSelectedfeedbacks(feedbacks.map((fdb) => fdb._id));
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
    { label: "Feedback Service" },
    { label: "Feedback Subject" },
    { label: "Feedback Message" },
    { label: "Site" },
    { label: "Created Date" },
    { label: "Updated Date" },
    { label: "Actions" },
  ];

  const rows = feedbacks.map((enq) => {
    const { _id, name, email, ccode, mobile, service, subject, feedbackMessage, createdAt, updatedAt, site } = enq;
    return {
      _id,
      checkbox: (
        <input
          key={_id}
          className="form-check-input"
          type="checkbox"
          checked={selectedfeedbacks.includes(_id)}
          onChange={() => handleCheckboxChange(_id)}
        />
      ),
      name: <TruncatableField title={"Name"} content={name} maxLength={20} />,
      email: <TruncatableField title={"Email"} content={email} maxLength={20} />,
      mobile: <TruncatableField title={"Mobile"} content={`${ccode ?? ""} ${mobile ?? ""}`} maxLength={15} />,
      service: <TruncatableField title={"Service"} content={service} maxLength={20} />,
      subject: <TruncatableField title={"Subject"} content={subject} maxLength={20} />,
      feedbackMessage: <TruncatableField title={"Feedback Message"} content={feedbackMessage} maxLength={50} />,
      siteName: <TruncatableField title={"Site"} content={`${site?.name} (${site?.host}) `} maxLength={20} />,
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt),
      action: (
        <div key={_id}>
          <button onClick={() => navigate(`/feedback/${_id}`)} className="btn btn-primary me-1">
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
            <h3 className="card-title">All Feedbacks</h3>
            <div className="card-options">
              <button className="btn btn-primary mx-2" onClick={() => setIntegrationModalOpen(true)}>
                Integration guide
              </button>
              {selectedfeedbacks.length ? (
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
        onConfirm={deleteSelectedFeedbacks}
        message={`Are you sure you want to delete selected feedbacks? This action cannot be undone.`}
      />
      <IntegrationModal
        isOpen={integrationModalOpen}
        onClose={() => setIntegrationModalOpen(false)}
        title={feedbackIntegrationData.title}
        url={feedbackIntegrationData.url}
        method={feedbackIntegrationData.method}
        bodyParams={feedbackIntegrationData.bodyParams}
        manditoryParams={feedbackIntegrationData.manditoryParams}
        headers={feedbackIntegrationData.headers}
        responseDetails={feedbackIntegrationData.responseDetails}
      />
    </div>
  );
};

export default FeedbackList;
