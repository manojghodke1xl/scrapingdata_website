import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";

export default function AddCaseStudy() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);

  const [detail, setDetail] = useState({
    title: "",
    sdesc: "",
    ldesc: "",
    image: null,
    pdf: null,
    isActive: true,
    isGlobal: false,
    sites: [],
  });
  const [availableSites, setAvailableSites] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/allSites`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        setAvailableSites(data.sites);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })();
  }, [alert]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/casestudy/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("auth"),
            },
          }
        );
        const { data, error } = await res.json();

        if (res.ok) {
          const { title, sdesc, ldesc, isActive, sites, image, pdf, isGlobal } =
            data.casestudy;
          setDetail((prev) => ({
            ...prev,
            title,
            sdesc,
            ldesc,
            isActive,
            isGlobal,
            sites,
            image,
            pdf,
          }));
        } else {
          alert({ type: "warning", title: "Warning !", text: error });
        }
      })()
        .catch((error) =>
          alert({ type: "danger", title: "Error !", text: error.message })
        )
        .finally(() => setLoading(false));
    }
  }, [id, alert, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!detail.title) newErrors.title = "Title is required";
    if (!detail.sites.length) newErrors.sites = "Minimum one site is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetails = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/casestudy${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("auth"),
          },
          body: JSON.stringify(detail),
        }
      );

      const { message, error } = await res.json();
      if (res.ok) {
        alert({ type: "success", title: "Success!", text: message });
        navigate("/casestudy-list");
      } else {
        alert({ type: "warning", title: "Warning!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const uploadFile = async (e, isImage, ispdf) => {
    const file = e.target.files[0];
    if (!file) return;

    const { name, size, type } = file;

    const validImageTypes = ["image/jpeg", "image/png"];
    const validPdfTypes = ["application/pdf"];

    if (isImage && !validImageTypes.includes(type)) {
      alert({
        type: "warning",
        title: "Invalid File Type",
        text: "Only PNG or JPEG formats are allowed for image uploads.",
      });
      imageInputRef.current.value = "";
      return;
    }

    if (ispdf && !validPdfTypes.includes(type)) {
      alert({
        type: "warning",
        title: "Invalid File Type",
        text: "Only PDF files are allowed for uploads.",
      });
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
        setDetail((prevDetail) => ({ ...prevDetail, image: fileId }));
      } else {
        setDetail((prevDetail) => ({ ...prevDetail, pdf: fileId }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert({ type: "danger", title: "Error !", text: error.message });
    }
  };

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">
              {id ? "Edit Casestudy" : "Add Casestudy"}
            </h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label "}>
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={detail.title}
                  onChange={(e) => {
                    setDetail((d) => ({ ...d, title: e.target.value }));
                    if (errors.title)
                      setErrors((prev) => ({ ...prev, title: "" }));
                  }}
                />
                {errors.title && (
                  <div className="alert alert-danger mt-2">{errors.title}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Short Description</label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={6}
                  placeholder="Description.."
                  value={detail.sdesc}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, sdesc: e.target.value }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Long Description</label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={6}
                  placeholder="Description.."
                  value={detail.ldesc}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, ldesc: e.target.value }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Image</label>
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
                <label className="form-label">Upload PDF</label>
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
                <label className={!id ? "form-label required" : "form-label "}>
                  Select Sites
                </label>
                <div
                  style={{
                    maxHeight: "150px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                >
                  {availableSites.map((site) => (
                    <label key={site._id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={site._id}
                        checked={detail.sites.includes(site._id)}
                        onChange={() => {
                          if (detail.sites)
                            setErrors((prev) => ({ ...prev, sites: "" }));
                          setDetail((prevDetail) => {
                            const isSelected = prevDetail.sites.includes(
                              site._id
                            );
                            return {
                              ...prevDetail,
                              sites: isSelected
                                ? prevDetail.sites.filter(
                                    (id) => id !== site._id
                                  )
                                : [...prevDetail.sites, site._id],
                            };
                          });
                        }}
                      />
                      <span className="form-check-label">{site.name}</span>
                    </label>
                  ))}
                </div>
                {errors.sites && (
                  <div className="alert alert-danger mt-2">{errors.sites}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="row">
                  <span className="col">Is Casestudy Active?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={detail.isActive}
                        onChange={() =>
                          setDetail((prev) => ({
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
                  <span className="col">Is Casestudy Global?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={detail.isGlobal}
                        onChange={() =>
                          setDetail((prev) => ({
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
                  {id ? "Update Casestudy" : "Add Casestudy"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
