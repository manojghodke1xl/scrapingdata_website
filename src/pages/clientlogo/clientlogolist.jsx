import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import useSetTimeout from "../../Hooks/useDebounce";
import useGetAllSites from "../../Hooks/useGetAllSites";
import DuplicateModal from "../../comps/modals/duplicate";
import { updateClientLogoSitesApi, updateClientLogoStatusApi, deleteClientLogoApi } from "../../apis/client-logo-apis";
import Addnote from "../../comps/addnote";
import ConfirmationModal from "../../comps/modals/confirmation";
import { formatDateTime } from "../../utils/function";
import TruncatableField from "../../comps/modals/truncatableField";

export default function ClientLogoList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [clientlogos, setClientLogos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedClientLogos, setSelectedClientLogos] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [siteId, setSiteId] = useState("");
  const [statusSelect, setStatusSelect] = useState("");
  const [duplicateModelOpen, setDuplicateModelOpen] = useState(false);
  const [confirmationModelOpen, setConfirmationModelOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const allsites = useGetAllSites();

  const filter = ["Active", "Inactive"];
  const Status = ["Active", "Inactive"];

  const [err, data, setRefresh] = useSetTimeout("client-logo", page - 1, limit, "", "", statusFilter, siteId);

  useEffect(() => {
    if (data) {
      setClientLogos(data.clientlogos);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", text: err.message });
    }
  }, [data, err, alert]);

  const updateSelectedClientLogosStatus = async (clientlogoStatus) => {
    setLoading(true);
    try {
      const { status, data } = await updateClientLogoStatusApi(selectedClientLogos, clientlogoStatus);

      if (status) {
        alert({
          type: "success",
          text: data.message,
        });
        setRefresh((r) => !r);
        setSelectedClientLogos([]);
        setSelectAll(false);
        setStatusSelect("");
      } else {
        alert({ type: "danger", image: "Error!", text: data });
      }
    } catch (error) {
      alert({ type: "danger", image: "Error!", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updateSites = async (selectedSites, selectedAction) => {
    setLoading(true);
    try {
      const action = selectedAction === "Add" ? true : false;
      const { status, data } = await updateClientLogoSitesApi(selectedClientLogos, selectedSites, action);
      if (status) {
        alert({
          type: "success",
          text: data.message,
        });
        setRefresh((r) => !r);
        setSelectedClientLogos([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setDuplicateModelOpen(false);
      setSelectedClientLogos([]);
    }
  };

  const deleteSelectedEnquiries = async () => {
    if (!selectedClientLogos.length)
      return alert({
        type: "warning",
        text: "Please select at least one clientlogo to delete.",
      });

    setLoading(true);
    try {
      const { status, data } = await deleteClientLogoApi(selectedClientLogos);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedClientLogos([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setConfirmationModelOpen(false);
      setSelectedClientLogos([]);
    }
  };

  const handleCheckboxChange = (clientlogoId) => {
    setSelectedClientLogos((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(clientlogoId)) {
        updatedSelected = prevSelected.filter((id) => id !== clientlogoId);
        setStatusSelect("");
      } else {
        updatedSelected = [...prevSelected, clientlogoId];
      }
      if (updatedSelected.length === clientlogos.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedClientLogos([]);
    } else {
      setSelectedClientLogos(clientlogos.map((clientlogo) => clientlogo._id));
    }
    setSelectAll(!selectAll);
  };

  const headers = [
    {
      label: <input className="form-check-input " type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
    },
    { label: "Image" },
    { label: "Created Date" },
    { label: "Updated Date" },
    { label: "Status" },
    { label: "Actions" },
    { label: "Sites" },
  ];

  const rows = clientlogos.map((clientlogo) => {
    const { _id, image, isActive, sites, createdAt, updatedAt } = clientlogo;
    console.log("image", image);
    return {
      _id,
      checkedbox: (
        <input
          key={clientlogo._id}
          className="form-check-input"
          type="checkbox"
          checked={selectedClientLogos.includes(clientlogo._id)}
          onChange={() => handleCheckboxChange(clientlogo._id)}
        />
      ),
      image: (
        <span
          style={{ backgroundImage: `url(${image.url})` }}
          onClick={() => setModalImage(image.url)}
          className="avatar cursor-pointer"
        />
      ),
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt),
      status:
        isActive === true ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <span className="badge bg-danger">Inactive</span>
        ),
      action: (
        <div key={clientlogo._id}>
          <button onClick={() => navigate(`/edit-client-logo/${clientlogo._id}`)} className="btn btn-primary me-1">
            Edit
          </button>
        </div>
      ),

      siteName: (
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
            <h3 className="card-image">All ClientLogos List</h3>
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
                {selectedClientLogos.length ? (
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
                      <button onClick={() => updateSelectedClientLogosStatus(true)} className="btn btn-success mx-2">
                        Apply
                      </button>
                    )}
                    {statusSelect === "inactive" && (
                      <button onClick={() => updateSelectedClientLogosStatus(false)} className="btn btn-danger mx-2">
                        Apply
                      </button>
                    )}
                    <button onClick={() => setDuplicateModelOpen(true)} className="btn btn-primary mx-2">
                      Sites
                    </button>
                    <button onClick={() => setConfirmationModelOpen(true)} className="btn btn-danger mx-2">
                      Delete
                    </button>
                  </>
                ) : null}

                <button onClick={() => navigate("/add-client-logo")} className="btn btn-primary">
                  Add ClientLogo
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
              onPageChange={(newPage) => setPage(newPage)}
              entriesPerPage={limit}
              // setSearchTerm={setSearchTerm}
              // setSearchKey={setSearchKey}
              // searchAbleKeys={searchAbleKeys}
              allsites={allsites}
              setSiteId={setSiteId}
              onEntriesChange={(newLimit) => setLimit(newLimit)}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>

      <Addnote
        des={`This is the All ClientLogos List page. There is an "Add ClientLogo" button to add a clientlogo. A filter dropdown is available to filter details by status, allowing you to view all clientlogos. The table includes the name of the ClientLogo Title, created date, updated date, status indicating whether the ClientLogo is Active or Inactive, the site assigned to the ClientLogo, and a Edit button to Editing specific ClientLogo details. There is also a site dropdown that lists all website names; selecting a specific website will show only the details related to that website in the table. Additionally, the table has a checkbox for changing the status of a particular ClientLogo or multiple ClientLogo. The checkbox is not available for Admins, as their status cannot be changed. There is a search dropdown, and when you select an option, you can search the table based on the selected option.`}
      />

      <DuplicateModal
        allsites={allsites}
        isOpen={duplicateModelOpen}
        onClose={setDuplicateModelOpen}
        onConfirm={updateSites}
        image="Update Sites"
        action={["Add", "Remove"]}
        confirmText="Update"
      />

      <ConfirmationModal
        isOpen={confirmationModelOpen}
        onClose={() => setConfirmationModelOpen(false)}
        onConfirm={deleteSelectedEnquiries}
        message={`Are you sure you want to delete selected images? This action cannot be undone.`}
      />

      {modalImage && (
        <div
          className="modal d-block bg-opacity-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setModalImage("")}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-body p-0">
                <img
                  src={modalImage}
                  alt="Enlarged View"
                  className="img-fluid rounded-lg shadow-lg"
                  style={{ maxHeight: "80vh", width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
