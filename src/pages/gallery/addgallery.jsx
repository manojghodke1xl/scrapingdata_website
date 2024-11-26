import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import useGetAllSites from "../../Hooks/useGetAllSites";
import { uploadMultipleFiles } from "../../utils/fileUpload";
import { addGalleryApi, getGalleryById, updateGalleryApi } from "../../apis/gallery-apis";

export default function AddGallery() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const availableSites = useGetAllSites();

  const [galleryDetails, setGalleryDetails] = useState({
    images: !id ? [] : undefined,
    isActive: true,
    isGlobal: false,
    sites: [],
  });
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getGalleryById(id);
        if (status) {
          const { image, sites, ...rest } = data.gallery;

          setGalleryDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            imageFile: image,
          }));
        } else {
          alert({ type: "warning", text: data });
        }
      })()
        .catch((error) => alert({ type: "danger", text: error.message }))
        .finally(() => setLoading(false));
    }
  }, [id, alert, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!id && !galleryDetails.images?.length) {
      newErrors.images = "At least one image is added";
    }
    if (galleryDetails.sites.length === 0) {
      newErrors.sites = "At least one site must be selected";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updateGalleryApi(id, galleryDetails) : addGalleryApi(galleryDetails));
      if (status) {
        alert({ type: "success", text: data.message });
        navigate("/gallery-list");
      } else {
        alert({ type: "warning", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    if (galleryDetails.images) setErrors((prev) => ({ ...prev, images: "" }));
    try {
      const fileIds = await uploadMultipleFiles(files);
      if (!id) setGalleryDetails((prev) => ({ ...prev, images: fileIds }));
      else setGalleryDetails((prev) => ({ ...prev, image: fileIds[0] }));
    } catch (error) {
      alert({ type: "danger", text: error.message });
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) setGalleryDetails((prev) => ({ ...prev, sites: [] }));
    else
      setGalleryDetails((prev) => ({
        ...prev,
        sites: availableSites.map((site) => site._id),
      }));

    setSelectAll(!selectAll);
  };

  const isAllSelected = galleryDetails.sites.length === availableSites.length;

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{id ? "Edit Gallery" : "Add Gallery"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className={id ? "form-label d-flex justify-content-between" : "form-label required"}>
                  {id ? "Upload Image" : "Upload Multiple Images"}
                  {id && galleryDetails.imageFile && (
                    <a href={galleryDetails.imageFile.url} download={galleryDetails.imageFile.name} target="_blank">
                      Download Image
                    </a>
                  )}
                </label>
                <input
                  type="file"
                  name="image"
                  className={`form-control ${errors.images ? "is-invalid" : ""}`}
                  onChange={(e) => handleFileUpload(e.target.files)}
                  accept="image/*"
                  multiple={!id}
                />
                {errors.images && <div className="invalid-feedback mx-2 mb-2">{errors.images}</div>}
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-3">
                  <label className={!id ? "form-label required mb-0 me-2" : "form-label mb-0 me-2"}>Select Sites</label>
                  <label className="form-check mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={isAllSelected}
                      onChange={handleSelectAllChange}
                    />
                    <span className="form-check-label">Select All</span>
                  </label>
                </div>

                <div className={`form-multi-check-box ${errors.sites ? "is-invalid" : ""}`}>
                  {availableSites.map((site) => (
                    <label key={site._id} className="form-check">
                      <input
                        className={`form-check-input ${errors.sites ? "is-invalid" : ""}`}
                        type="checkbox"
                        value={site._id}
                        checked={galleryDetails.sites.includes(site._id)}
                        onChange={() => {
                          if (galleryDetails.sites) setErrors((prev) => ({ ...prev, sites: "" }));

                          setGalleryDetails((prevDetail) => {
                            const isSelected = prevDetail.sites.includes(site._id);
                            return {
                              ...prevDetail,
                              sites: isSelected
                                ? prevDetail.sites.filter((id) => id !== site._id)
                                : [...prevDetail.sites, site._id],
                            };
                          });
                        }}
                      />
                      <span className="form-check-label">{site.name}</span>
                    </label>
                  ))}
                </div>
                {errors.sites && <div className="invalid-feedback mx-2 mb-2">{errors.sites}</div>}
              </div>
              <div className="mb-3">
                <label className="row">
                  <span className="col">Is Gallery Active?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-singl  e form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="status"
                        checked={galleryDetails.isActive}
                        onChange={() =>
                          setGalleryDetails((prev) => ({
                            ...prev,
                            isActive: !prev.isActive,
                          }))
                        }
                      />
                    </label>
                  </span>
                </label>
              </div>
              <div className="mb-3">
                <label className="row">
                  <span className="col">Is Gallery Global?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={galleryDetails.isGlobal}
                        onChange={() =>
                          setGalleryDetails((prev) => ({
                            ...prev,
                            isGlobal: !prev.isGlobal,
                          }))
                        }
                      />
                    </label>
                  </span>
                </label>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* {!id ? <Addnote des={addGalleryNote} /> : <Addnote des={editGalleryNote} />} */}
    </div>
  );
}
