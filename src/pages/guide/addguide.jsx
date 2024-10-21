import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { getAllSitesApi } from "../../apis/site-apis";
import { getGuideById, addGuideApi, updateGuideApi } from "../../apis/guide-apis";

export default function AddGuide() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);

  const [guideDetails, setGuideDetails] = useState({
    title: "",
    desc: "",
    isActive: true,
    isGlobal: false,
    image: null,
    pdf: null,
    sites: [],
  });
  const [availableSites, setAvailableSites] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllSitesApi();
      if (status) {
        setAvailableSites(data.sites);
      } else {
        alert({ type: "warning", text: data });
      }
    })();
  }, [alert]);

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
          console.log(data);
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

  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const uploadFile = async (e, isImage, isPdf) => {
    const file = e.target.files[0];
    if (!file) return;

    const { name, size, type } = file;

    const validImageTypes = ["image/jpeg", "image/png"];
    const validPdfTypes = ["application/pdf"];

    if (isImage && !validImageTypes.includes(type)) {
      alert({ type: "warning", text: "Only PNG or JPEG formats are allowed for image uploads." });
      imageInputRef.current.value = "";
      return;
    }

    if (isPdf && !validPdfTypes.includes(type)) {
      alert({ type: "warning", text: "Only PDF files are allowed for uploads." });
      fileInputRef.current.value = "";
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("auth"),
        },
        body: JSON.stringify({ name, size, mime: type }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to get upload URL");
      }

      const { data } = await res.json();
      const fd = new FormData();
      for (const [key, val] of Object.entries(data.fields)) {
        fd.append(key, val);
      }

      fd.append("file", file);

      const uploadRes = await fetch(data.url, {
        method: "POST",
        body: fd,
      });

      if (!uploadRes.ok) {
        throw new Error("File upload failed");
      }
      const fileId = data._id;

      if (isImage) {
        setGuideDetails((prevDetail) => ({ ...prevDetail, image: fileId }));
      } else {
        setGuideDetails((prevDetail) => ({ ...prevDetail, pdf: fileId }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert({ type: "danger", text: error.message });
    }
  };

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
                  onChange={(e) => uploadFile(e, true)}
                  accept="image/*"
                  ref={imageInputRef}
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
                  onChange={(e) => uploadFile(e, false)}
                  accept="application/pdf"
                  ref={fileInputRef}
                />
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Select Sites</label>
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
