import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { getGuideById, addGuideApi, updateGuideApi } from "../../apis/guide-apis";
import useGetAllSites from "../../Hooks/useGetAllSites";
import { uploadFile } from "../../utils/fileUpload";

export default function AddGuide() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const availableSites = useGetAllSites();

  const [guideDetails, setGuideDetails] = useState({
    title: "",
    desc: "",
    isActive: true,
    isGlobal: false,
    image: null,
    pdf: null,
    sites: [],
  });
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getGuideById(id);
        if (status) {
          const { image, pdf, sites, ...rest } = data.guide;

          setGuideDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            pdfFile: pdf,
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
    if (!guideDetails.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (guideDetails.sites.length === 0) {
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
      const { status, data } = await (id ? updateGuideApi(id, guideDetails) : addGuideApi(guideDetails));
      if (status) {
        alert({ type: "success", text: data.message });
        navigate("/guide-list");
      } else {
        alert({ type: "warning", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e, isImage, isPdf) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile({
        file,
        isImage,
        isPdf,
        alert,
        setDetails: setGuideDetails,
        fieldName: isImage ? "image" : "pdf",
      });
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) setGuideDetails((prev) => ({ ...prev, sites: [] }));
    else
      setGuideDetails((prev) => ({
        ...prev,
        sites: availableSites.map((site) => site._id),
      }));

    setSelectAll(!selectAll);
  };

  const isAllSelected = guideDetails.sites.length === availableSites.length;

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{id ? "Edit Guide" : "Add Guide"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Title</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  placeholder="Title"
                  value={guideDetails.title}
                  onChange={(e) => {
                    setGuideDetails((d) => ({ ...d, title: e.target.value }));
                    if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
                  }}
                />
                {errors.title && <div className="invalid-feedback mt-2">{errors.title}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={6}
                  placeholder="Description.."
                  value={guideDetails.desc}
                  onChange={(e) => setGuideDetails((d) => ({ ...d, desc: e.target.value }))}
                />
              </div>
              <div className="mb-3">
                <label className={id ? "form-label d-flex justify-content-between" : "form-label required"}>
                  Upload Image
                  {id && guideDetails.imageFile && (
                    <a href={guideDetails.imageFile.url} download={guideDetails.imageFile.name} target="_blank">
                      Download Image
                    </a>
                  )}
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={(e) => handleFileUpload(e, true, false, false)}
                  accept="image/*"
                />
              </div>
              <div className="mb-3">
                <label className={id ? "form-label d-flex justify-content-between" : "form-label required"}>
                  Upload Pdf
                  {id && guideDetails.pdfFile && (
                    <a href={guideDetails.pdfFile.url} download={guideDetails.pdfFile.name} target="_blank">
                      Download Pdf
                    </a>
                  )}
                </label>
                <input
                  type="file"
                  name="pdf"
                  className="form-control"
                  onChange={(e) => handleFileUpload(e, false, true, false)}
                  accept="application/pdf"
                />
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
                        checked={guideDetails.sites.includes(site._id)}
                        onChange={() => {
                          if (guideDetails.sites) setErrors((prev) => ({ ...prev, sites: "" }));

                          setGuideDetails((prevDetail) => {
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
                  <span className="col">Is Guide Active?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-singl  e form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="status"
                        checked={guideDetails.isActive}
                        onChange={() => setGuideDetails((prev) => ({ ...prev, isActive: !prev.isActive }))}
                      />
                    </label>
                  </span>
                </label>
              </div>
              <div className="mb-3">
                <label className="row">
                  <span className="col">Is Guide Global?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={guideDetails.isGlobal}
                        onChange={() => setGuideDetails((prev) => ({ ...prev, isGlobal: !prev.isGlobal }))}
                      />
                    </label>
                  </span>
                </label>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Update Guide" : "Add Guide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
