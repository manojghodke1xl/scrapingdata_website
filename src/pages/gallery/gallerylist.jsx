import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import useSetTimeout from "../../Hooks/useDebounce";
import useGetAllSites from "../../Hooks/useGetAllSites";
import DuplicateModal from "../../comps/duplicate";
import { updateGallerySitesApi, updateGalleryStatusApi, deleteGalleryApi } from "../../apis/gallery-apis";
import Addnote from "../../comps/addnote";
import ConfirmationModal from "../../comps/confirmation";
import { formatDateTime } from "../../utils/function";

export default function GalleryList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [galleries, setGalleries] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedGalleries, setSelectedGalleries] = useState([]);
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

  const [err, data, setRefresh] = useSetTimeout("gallery", page - 1, limit, "", "", statusFilter, siteId);

  useEffect(() => {
    if (data) {
      setGalleries(data.galleries);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", text: err.message });
    }
  }, [data, err, alert]);

  const updateSelectedGalleriesStatus = async (galleryStatus) => {
    setLoading(true);
    try {
      const { status, data } = await updateGalleryStatusApi(selectedGalleries, galleryStatus);

      if (status) {
        alert({
          type: "success",
          text: data.message,
        });
        setRefresh((r) => !r);
        setSelectedGalleries([]);
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
      const { status, data } = await updateGallerySitesApi(selectedGalleries, selectedSites, action);
      if (status) {
        alert({
          type: "success",
          text: data.message,
        });
        setRefresh((r) => !r);
        setSelectedGalleries([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setDuplicateModelOpen(false);
      setSelectedGalleries([]);
    }
  };

  const deleteSelectedEnquiries = async () => {
    if (!selectedGalleries.length)
      return alert({
        type: "warning",
        text: "Please select at least one gallery to delete.",
      });

    setLoading(true);
    try {
      const { status, data } = await deleteGalleryApi(selectedGalleries);
      if (status) {
        alert({ type: "success", text: data.message });
        setRefresh((r) => !r);
        setSelectedGalleries([]);
        setSelectAll(false);
      } else {
        alert({ type: "danger", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
      setConfirmationModelOpen(false);
      setSelectedGalleries([]);
    }
  };

  const handleCheckboxChange = (galleryId) => {
    setSelectedGalleries((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(galleryId)) {
        updatedSelected = prevSelected.filter((id) => id !== galleryId);
        setStatusSelect("");
      } else {
        updatedSelected = [...prevSelected, galleryId];
      }
      if (updatedSelected.length === galleries.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedGalleries([]);
    } else {
      setSelectedGalleries(galleries.map((gallery) => gallery._id));
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

  const rows = galleries.map((gallery) => {
    const { _id, image, isActive, sites, createdAt, updatedAt } = gallery;
    console.log("image", image);
    return {
      _id,
      checkedbox: (
        <input
          key={gallery._id}
          className="form-check-input"
          type="checkbox"
          checked={selectedGalleries.includes(gallery._id)}
          onChange={() => handleCheckboxChange(gallery._id)}
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
        <div key={gallery._id}>
          <button onClick={() => navigate(`/edit-gallery/${gallery._id}`)} className="btn btn-primary me-1">
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
            <h3 className="card-image">All Galleries List</h3>
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
                {selectedGalleries.length ? (
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
                      <button onClick={() => updateSelectedGalleriesStatus(true)} className="btn btn-success mx-2">
                        Apply
                      </button>
                    )}
                    {statusSelect === "inactive" && (
                      <button onClick={() => updateSelectedGalleriesStatus(false)} className="btn btn-danger mx-2">
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

                <button onClick={() => navigate("/add-gallery")} className="btn btn-primary">
                  Add Gallery
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
        des={`This is the All Galleries List page. There is an "Add Gallery" button to add a gallery. A filter dropdown is available to filter details by status, allowing you to view all galleries. The table includes the name of the Gallery Title, created date, updated date, status indicating whether the Gallery is Active or Inactive, the site assigned to the Gallery, and a Edit button to Editing specific Gallery details. There is also a site dropdown that lists all website names; selecting a specific website will show only the details related to that website in the table. Additionally, the table has a checkbox for changing the status of a particular Gallery or multiple Gallery. The checkbox is not available for Admins, as their status cannot be changed. There is a search dropdown, and when you select an option, you can search the table based on the selected option.`}
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
