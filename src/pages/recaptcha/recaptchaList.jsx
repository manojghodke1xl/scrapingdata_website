import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import useGetAllSites from "../../Hooks/useGetAllSites";
import useSetTimeout from "../../Hooks/useDebounce";
import { deleteRecaptchaApi, updateRecaptchaSitesApi, updateRecaptchaStatusApi } from "../../apis/recaptcha-apis";
import TruncatableField from "../../comps/modals/truncatableField";
import Table from "../../comps/table";
import DuplicateModal from "../../comps/modals/duplicate";
import ConfirmationModal from "../../comps/modals/confirmation";

const RecaptchaList = () => {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);
  const allsites = useGetAllSites();

  const [recaptchas, setRecaptchas] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusSelect, setStatusSelect] = useState("");
  const [siteId, setSiteId] = useState("");
  const [selectedRecaptchas, setSelectedRecaptchas] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);

  const searchAbleKeys = ["Version", "sitekey", "secretkey"];
  const filter = ["Active", "Inactive"];
  const Status = ["Active", "Inactive"];

  const [err, data, setRefresh] = useSetTimeout(
    "recaptcha",
    page - 1,
    limit,
    searchTerm,
    searchKey,
    statusFilter,
    siteId
  );

  useEffect(() => {
    if (data) {
      setRecaptchas(data.recaptchas);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", text: err.message });
    }
  }, [data, err, alert]);

  const deleteSelectedRecaptchas = async () => {
    setLoading(true);
    try {
      console.log(selectedRecaptchas);
      const { status, data } = await deleteRecaptchaApi(selectedRecaptchas);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedRecaptchas([]);
        setSelectAll(false);
      } else alert({ type: "danger", text: data });
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setDeleteModel(false);
    }
  };

  const updateRecaptchaStatus = async (recaptchaStatus) => {
    setLoading(true);
    try {
      const { status, data } = await updateRecaptchaStatusApi(selectedRecaptchas, recaptchaStatus);

      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedRecaptchas([]);
        setSelectAll(false);
        setStatusSelect("");
      } else alert({ type: "danger", text: data });
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updateRecaptchaSites = async (selectedSites, selectedAction) => {
    setLoading(true);
    try {
      const action = selectedAction === "Add" ? true : false;
      const { status, data } = await updateRecaptchaSitesApi(selectedRecaptchas, selectedSites, action);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedRecaptchas([]);
        setSelectAll(false);
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedRecaptchas([]);
    }
  };

  const handleCheckboxChange = (recaptchaId) => {
    setSelectedRecaptchas((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(recaptchaId)) {
        updatedSelected = prevSelected.filter((id) => id !== recaptchaId);
        setStatusSelect("");
      } else updatedSelected = [...prevSelected, recaptchaId];

      if (updatedSelected.length === recaptchas.length) setSelectAll(true);
      else setSelectAll(false);
      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) setSelectedRecaptchas([]);
    else setSelectedRecaptchas(recaptchas.map((recaptcha) => recaptcha._id));
    setSelectAll(!selectAll);
  };

  const headers = [
    {
      label: <input className="form-check-input " type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
    },
    { label: "Version" },
    { label: "site Key" },
    { label: "Secret Key" },
    { label: "Status" },
    { label: "Actions" },
    { label: "Sites" },
  ];

  const rows = recaptchas.map((recaptcha) => {
    const { _id, version, sitekey, secretkey, isActive, sites } = recaptcha;
    return {
      _id,
      checkBox: (
        <input
          className="form-check-input "
          type="checkbox"
          checked={selectedRecaptchas.includes(_id)}
          onChange={() => handleCheckboxChange(_id)}
        />
      ),
      version: "v" + version,
      sitekey: <TruncatableField title={"Site Key"} content={sitekey} maxLength={50} />,
      secretkey: <TruncatableField title={"Secret Key"} content={secretkey} maxLength={50} />,
      status:
        isActive === true ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <span className="badge bg-danger">Inactive</span>
        ),

      action: (
        <div key={_id}>
          <button onClick={() => navigate(`/edit-recaptcha/${_id}`)} className="btn btn-primary me-1">
            Edit
          </button>
        </div>
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
            <h3 className="card-title">All reCAPTCHA</h3>
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
                {selectedRecaptchas.length ? (
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
                      <button onClick={() => updateRecaptchaStatus(true)} className="btn btn-success mx-2">
                        Apply
                      </button>
                    )}
                    {statusSelect === "inactive" && (
                      <button onClick={() => updateRecaptchaStatus(false)} className="btn btn-danger mx-2">
                        Apply
                      </button>
                    )}
                    <button onClick={() => setModalOpen(true)} className="btn btn-primary mx-2">
                      Sites
                    </button>
                    <button onClick={() => setDeleteModel(true)} className="btn btn-danger mx-2">
                      Delete
                    </button>
                  </>
                ) : null}

                <button onClick={() => navigate("/add-recaptcha")} className="btn btn-primary">
                  Add reCAPTCHA
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

      <ConfirmationModal
        isOpen={deleteModel}
        onClose={() => setDeleteModel(false)}
        onConfirm={deleteSelectedRecaptchas}
        message={`Are you sure you want to delete selected reCAPTCHA? This action cannot be undone.`}
      />
      <DuplicateModal
        allsites={allsites}
        isOpen={modalOpen}
        onClose={setModalOpen}
        onConfirm={updateRecaptchaSites}
        title="Update Sites"
        action={["Add", "Remove"]}
        confirmText="Update"
      />
    </div>
  );
};

export default RecaptchaList;
