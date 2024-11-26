import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import useSetTimeout from "../../Hooks/useDebounce";
import useGetAllSites from "../../Hooks/useGetAllSites";
import DuplicateModal from "../../comps/duplicate";
import { updateCaseStudySitesApi, updateCaseStudyStatusApi } from "../../apis/caseStudy-apis";
import Addnote from "../../comps/addnote";
import { listAdminNote } from "../notes/notes-message";
import { formatDateTime } from "../../utils/function";

export default function CaseStudyList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [caseStudies, setCaseStudies] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedCaseStudies, setSelectedCaseStudies] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [siteId, setSiteId] = useState("");
  const [statusSelect, setStatusSelect] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const allsites = useGetAllSites();

  const searchAbleKeys = ["Title"];
  const filter = ["Active", "Inactive"];
  const Status = ["Active", "Inactive"];

  const [err, data, setRefresh] = useSetTimeout(
    "casestudies",
    page - 1,
    limit,
    searchTerm,
    searchKey,
    statusFilter,
    siteId
  );

  useEffect(() => {
    if (data) {
      setCaseStudies(data.casestudies);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", text: err.message });
    }
  }, [data, err, alert]);

  const updateCaseStudiesStatus = async (caseStudyStatus) => {
    setLoading(true);
    try {
      const { status, data } = await updateCaseStudyStatusApi(selectedCaseStudies, caseStudyStatus);

      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedCaseStudies([]);
        setSelectAll(false);
        setStatusSelect("");
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updateCaseStudySites = async (selectedSites, selectedAction) => {
    setLoading(true);
    try {
      const action = selectedAction === "Add" ? true : false;
      const { status, data } = await updateCaseStudySitesApi(selectedCaseStudies, selectedSites, action);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedCaseStudies([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedCaseStudies([]);
    }
  };

  const handleCheckboxChange = (casestudyId) => {
    setSelectedCaseStudies((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(casestudyId)) {
        updatedSelected = prevSelected.filter((id) => id !== casestudyId);
        setStatusSelect("");
      } else {
        updatedSelected = [...prevSelected, casestudyId];
      }
      if (updatedSelected.length === caseStudies.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }

      return updatedSelected;
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
      label: <input className="form-check-input " type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
    },
    { label: "Title" },
    { label: "Created Date" },
    { label: "Updated Date" },
    { label: "Status" },
    { label: "Actions" },
    { label: "Sites" },
  ];

  const rows = caseStudies.map((casestudy) => {
    const { _id, title, isActive, sites, createdAt, updatedAt } = casestudy;
    return {
      _id,
      checkedBox: (
        <input
          key={_id}
          className="form-check-input"
          type="checkbox"
          checked={selectedCaseStudies.includes(_id)}
          onChange={() => handleCheckboxChange(_id)}
        />
      ),
      title,
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt),
      status:
        isActive === true ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <span className="badge bg-danger">Inactive</span>
        ),

      action: (
        <div key={_id}>
          <button onClick={() => navigate(`/edit-casestudy/${_id}`)} className="btn btn-primary me-1">
            Edit
          </button>
        </div>
      ),
      sites: sites.map((s) => `${s.name} (${s.host})`).join(", "),
    };
  });

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Case Study List</h3>
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
                {selectedCaseStudies.length ? (
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
                      <button onClick={() => updateCaseStudiesStatus(true)} className="btn btn-success mx-2">
                        Apply
                      </button>
                    )}
                    {statusSelect === "inactive" && (
                      <button onClick={() => updateCaseStudiesStatus(false)} className="btn btn-danger mx-2">
                        Apply
                      </button>
                    )}
                    <button onClick={() => setModalOpen(true)} className="btn btn-primary mx-2">
                      Sites
                    </button>
                  </>
                ) : null}

                <button onClick={() => navigate("/add-casestudy")} className="btn btn-primary">
                  Add CaseStudy
                </button>
              </div>
            </div>
          </div>

          <div className="table-responsive  ">
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
              onEntriesChange={(newLimit) => setLimit(newLimit)}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
      <DuplicateModal
        allsites={allsites}
        isOpen={modalOpen}
        onClose={setModalOpen}
        onConfirm={updateCaseStudySites}
        title="Update Sites"
        action={["Add", "Remove"]}
        confirmText="Update"
      />

      <Addnote des={listAdminNote} />
    </div>
  );
}
