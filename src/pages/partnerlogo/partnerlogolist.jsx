import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import useSetTimeout from "../../Hooks/useDebounce";
import useGetAllSites from "../../Hooks/useGetAllSites";
import DuplicateModal from "../../comps/duplicate";
import { updatePartnerLogoSitesApi, updatePartnerLogoStatusApi, deletePartnerLogoApi } from "../../apis/partner-logo-apis";
import Addnote from "../../comps/addnote";
import ConfirmationModal from "../../comps/confirmation";
import { formatDateTime } from "../../utils/function";

export default function PartnerLogoList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [partnerlogos, setPartnerLogos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPartnerLogos, setSelectedPartnerLogos] = useState([]);
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

  const [err, data, setRefresh] = useSetTimeout("partner-logo", page - 1, limit, "", "", statusFilter, siteId);

  useEffect(() => {
    if (data) {
      setPartnerLogos(data.partnerlogos);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", text: err.message });
    }
  }, [data, err, alert]);

  const updateSelectedPartnerLogosStatus = async (partnerlogoStatus) => {
    setLoading(true);
    try {
      const { status, data } = await updatePartnerLogoStatusApi(selectedPartnerLogos, partnerlogoStatus);

      if (status) {
        alert({
          type: "success",
          text: data.message,
        });
        setRefresh((r) => !r);
        setSelectedPartnerLogos([]);
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
      const { status, data } = await updatePartnerLogoSitesApi(selectedPartnerLogos, selectedSites, action);
      if (status) {
        alert({
          type: "success",
          text: data.message,
        });
        setRefresh((r) => !r);
        setSelectedPartnerLogos([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setDuplicateModelOpen(false);
      setSelectedPartnerLogos([]);
    }
  };

  const deleteSelectedEnquiries = async () => {
    if (!selectedPartnerLogos.length)
      return alert({
        type: "warning",
        text: "Please select at least one partnerlogo to delete.",
      });

    setLoading(true);
    try {
      const { status, data } = await deletePartnerLogoApi(selectedPartnerLogos);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedPartnerLogos([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setConfirmationModelOpen(false);
      setSelectedPartnerLogos([]);
    }
  };

  const handleCheckboxChange = (partnerlogoId) => {
    setSelectedPartnerLogos((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(partnerlogoId)) {
        updatedSelected = prevSelected.filter((id) => id !== partnerlogoId);
        setStatusSelect("");
      } else {
        updatedSelected = [...prevSelected, partnerlogoId];
      }
      if (updatedSelected.length === partnerlogos.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPartnerLogos([]);
    } else {
      setSelectedPartnerLogos(partnerlogos.map((partnerlogo) => partnerlogo._id));
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

  const rows = partnerlogos.map((partnerlogo) => {
    const { _id, image, isActive, sites, createdAt, updatedAt } = partnerlogo;
    console.log("image", image);
    return {
      _id,
      checkedbox: (
        <input
          key={partnerlogo._id}
          className="form-check-input"
          type="checkbox"
          checked={selectedPartnerLogos.includes(partnerlogo._id)}
          onChange={() => handleCheckboxChange(partnerlogo._id)}
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
        <div key={partnerlogo._id}>
          <button onClick={() => navigate(`/edit-partner-logo/${partnerlogo._id}`)} className="btn btn-primary me-1">
            Edit
          </button>
        </div>
      ),
      siteName: sites.map((s) => `${s.name} (${s.host})`).join(", "),
    };
  });

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-image">All PartnerLogos List</h3>
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
                {selectedPartnerLogos.length ? (
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
                      <button onClick={() => updateSelectedPartnerLogosStatus(true)} className="btn btn-success mx-2">
                        Apply
                      </button>
                    )}
                    {statusSelect === "inactive" && (
                      <button onClick={() => updateSelectedPartnerLogosStatus(false)} className="btn btn-danger mx-2">
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

                <button onClick={() => navigate("/add-partner-logo")} className="btn btn-primary">
                  Add PartnerLogo
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
        des={`This is the All PartnerLogos List page. There is an "Add PartnerLogo" button to add a partnerlogo. A filter dropdown is available to filter details by status, allowing you to view all partnerlogos. The table includes the name of the PartnerLogo Title, created date, updated date, status indicating whether the PartnerLogo is Active or Inactive, the site assigned to the PartnerLogo, and a Edit button to Editing specific PartnerLogo details. There is also a site dropdown that lists all website names; selecting a specific website will show only the details related to that website in the table. Additionally, the table has a checkbox for changing the status of a particular PartnerLogo or multiple PartnerLogo. The checkbox is not available for Admins, as their status cannot be changed. There is a search dropdown, and when you select an option, you can search the table based on the selected option.`}
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
