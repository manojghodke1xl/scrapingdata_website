import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import Table from "../../comps/table";
import useSetTimeout from "../../Hooks/useDebounce";
import useGetAllSites from "../../Hooks/useGetAllSites";
import { deleteFaqApi, updateFaqSitesApi, updateFaqStatusApi } from "../../apis/faq-apis";
import ConfirmationModal from "../../comps/modals/confirmation";
import DuplicateModal from "../../comps/modals/duplicate";
import TruncatableField from "../../comps/modals/truncatableField";

const FaqList = () => {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);
  const allsites = useGetAllSites();

  const [faqs, setFaqs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [siteModal, setSiteModal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedFaqs, setSelectedFaqs] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [siteId, setSiteId] = useState("");
  const [statusSelect, setStatusSelect] = useState("");

  const searchAbleKeys = ["Question"];
  const filter = ["Active", "Inactive"];
  const Status = ["Active", "Inactive"];

  const [err, data, setRefresh] = useSetTimeout("faq", page - 1, limit, searchTerm, searchKey, statusFilter, siteId);

  useEffect(() => {
    if (data) {
      setFaqs(data.faqs);
      setTotalCount(data.count);
    } else if (err) alert({ type: "warning", text: err.message });
  }, [alert, data, err]);

  const updateFaqStatus = async (faqStatus) => {
    setLoading(true);
    try {
      const { status, data } = await updateFaqStatusApi(selectedFaqs, faqStatus);

      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedFaqs([]);
        setStatusSelect("");
        setSelectAll(false);
      } else alert({ type: "danger", title: "Error!", text: data });
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updateFaqSites = async (selectedSites, selectedAction) => {
    setLoading(true);
    try {
      const action = selectedAction === "Add" ? true : false;
      const { status, data } = await updateFaqSitesApi(selectedFaqs, selectedSites, action);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedFaqs([]);
        setSelectAll(false);
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedFaqs([]);
    }
  };

  const deleteSelectedFaq = async () => {
    if (!selectedFaqs.length) {
      alert({ type: "warning", text: "Please select at least one testimonial to delete." });
      return;
    }
    setLoading(true);
    try {
      const { status, data } = await deleteFaqApi(selectedFaqs);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
      } else alert({ type: "danger", title: "Error!", text: data });
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedFaqs([]);
      setStatusSelect("");
    }
  };

  const handleCheckboxChange = (testimonialId) => {
    setSelectedFaqs((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(testimonialId)) {
        updatedSelected = prevSelected.filter((id) => id !== testimonialId);
        setStatusSelect("");
      } else updatedSelected = [...prevSelected, testimonialId];

      if (updatedSelected.length === faqs.length) setSelectAll(true);
      else setSelectAll(false);

      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedFaqs([]);
    } else {
      setSelectedFaqs(faqs.map((faq) => faq._id));
    }
    setSelectAll(!selectAll);
  };

  const headers = [
    {
      label: <input className="form-check-input " type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
    },
    { label: "Question" },
    { label: "Answer" },
    { label: "Status" },
    { label: "Actions" },
    { label: "Sites" },
  ];

  const rows = faqs.map((faq) => {
    const { _id, question, answer, isActive, sites } = faq;
    return {
      _id,
      checkedbox: (
        <input
          key={_id}
          className="form-check-input"
          type="checkbox"
          checked={selectedFaqs.includes(_id)}
          onChange={() => handleCheckboxChange(_id)}
        />
      ),
      question: <TruncatableField title={"Question"} content={question} maxLength={50} />,
      answer: <TruncatableField title={"Answer"} content={answer} maxLength={50} />,
      status: isActive ? (
        <span className="badge bg-success">Active</span>
      ) : (
        <span className="badge bg-danger">Inactive</span>
      ),
      action: (
        <button key={_id} onClick={() => navigate(`/edit-faq/${_id}`)} className="btn btn-primary me-1">
          Edit
        </button>
      ),
      sites: (
        <TruncatableField
          title={"Sties"}
          content={sites.map((s) => `${s.name} (${s.host})`).join(", ")}
          maxLength={50}
        />
      ),
    };
  });

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Faq List</h3>
            <div className="card-options d-flex gap-2">
              <div className="card-options">
                <div className="text-secondary">
                  Filter
                  <div className="mx-2 d-inline-block">
                    <select className="form-select form-control-sm" onChange={(e) => setStatusFilter(e.target.value)}>
                      <option value="">All</option>
                      {filter.map((key, i) => (
                        <option key={i} value={key.toLowerCase()}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {selectedFaqs.length ? (
                  <>
                    <div className="text-secondary">
                      Status
                      <div className="mx-2 d-inline-block">
                        <select
                          className="form-select form-control-sm"
                          onChange={(e) => setStatusSelect(e.target.value)}
                        >
                          <option value="">Select</option>
                          {Status.map((key, i) => (
                            <option key={i} value={key.toLowerCase()}>
                              {key}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {statusSelect === "active" && (
                      <button onClick={() => updateFaqStatus(true)} className="btn btn-success mx-2">
                        Apply
                      </button>
                    )}
                    {statusSelect === "inactive" && (
                      <button onClick={() => updateFaqStatus(false)} className="btn btn-danger mx-2">
                        Apply
                      </button>
                    )}
                    <button onClick={() => setSiteModal(true)} className="btn btn-primary mx-2">
                      Sites
                    </button>
                    <button onClick={() => setModalOpen(true)} className="btn btn-danger mx-2">
                      Delete
                    </button>
                  </>
                ) : null}
                <button onClick={() => navigate("/add-faq")} className="btn btn-primary">
                  Add Faq
                </button>
              </div>
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
        onConfirm={deleteSelectedFaq}
        message="Are you sure you want to delete this Faq?"
      />
      <DuplicateModal
        allsites={allsites}
        isOpen={siteModal}
        onClose={setSiteModal}
        onConfirm={updateFaqSites}
        title="Update Sites"
        action={["Add", "Remove"]}
        confirmText="Update"
      />
    </div>
  );
};
export default FaqList;
