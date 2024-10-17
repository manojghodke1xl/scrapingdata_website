import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function AddTestimonial() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const [errors, setErrors] = useState({});

  const [detail, setDetail] = useState({
    name: "",
    desg: "",
    text: "",
    isActive: true,
    isGlobal: false,
    sites: [],
    categories: [],
  });
  const [availableSites, setAvailableSites] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/allsites`, {
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

    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/allcategories`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        setAvailableCategories(data.categories);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })();
  }, [alert]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/testimonial/${id}`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        });
        const { data, error } = await res.json();

        if (res.ok) {
          const { name, desg, text, isGlobal, sites, isActive, categories, image, video, videoUrl } = data.testimonial;
          setDetail((prev) => ({
            ...prev,
            image,
            video,
            name,
            desg,
            text,
            isGlobal,
            sites,
            isActive,
            categories,
            videoUrl,
          }));
        } else {
          alert({ type: "warning", title: "Warning !", text: error });
        }
      })()
        .catch((error) => alert({ type: "danger", title: "Error !", text: error.message }))
        .finally(() => setLoading(false));
    }
  }, [id, alert, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!detail.name) newErrors.name = "Name is required";
    if (!detail.text) newErrors.text = "Text is required";
    if (!detail.sites.length) newErrors.sites = "At least one site must be selected";
    if (!detail.categories.length) newErrors.categories = "At least one category must be selected";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetails = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/testimonial${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("auth"),
        },
        body: JSON.stringify(detail),
      });
      const { message, error } = await res.json();
      if (res.ok) {
        alert({ type: "success", title: "Success !", text: message });
        navigate("/testimonial-list");
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error !", text: error.message });
    } finally {
      setLoading(false);
    }
  };
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const uploadFile = async (e, isImage) => {
    const file = e.target.files[0];
    if (!file) return;

    const { name, size, type } = file;

    const validImageTypes = ["image/jpeg", "image/png"];
    const validVideoTypes = ["video/mp4", "video/mov"];

    if (isImage && !validImageTypes.includes(type)) {
      alert({
        type: "warning",
        title: "Invalid File Type",
        text: "Only PNG or JPEG formats are allowed for image uploads.",
      });
      imageInputRef.current.value = "";
      return;
    }

    if (!isImage && !validVideoTypes.includes(type)) {
      alert({
        type: "warning",
        title: "Invalid File Type",
        text: "Only MP4 or MOV formats are allowed for video uploads.",
      });
      videoInputRef.current.value = "";
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
        setDetail((prevDetail) => ({ ...prevDetail, video: fileId }));
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
            <h2 className="h2 text-center mb-4">{!id ? "Add Testimonial" : "Edit Testimonial"}</h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Name</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Name"
                  value={detail.name}
                  onChange={(e) => {
                    setDetail((d) => ({ ...d, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                />
                {errors.name && <div className="alert alert-danger mt-2">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>short Description</label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={6}
                  placeholder="Description.."
                  value={detail.desg}
                  onChange={(e) => setDetail((d) => ({ ...d, desg: e.target.value }))}
                />
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Text</label>
                <input
                  type="text"
                  name="text"
                  className="form-control"
                  placeholder="Text"
                  value={detail.text}
                  onChange={(e) => setDetail((d) => ({ ...d, text: e.target.value }))}
                />
                {errors.text && <div className="alert alert-danger mt-2">{errors.text}</div>}
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
                <label className="form-label">Upload Video</label>
                <input
                  type="file"
                  name="video"
                  className="form-control"
                  onChange={(e) => uploadFile(e, false)}
                  accept="video/*"
                  ref={videoInputRef}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Video URL</label>
                <input
                  type="url"
                  name="url"
                  className="form-control"
                  placeholder="Url.."
                  value={detail.videoUrl}
                  onChange={(e) => setDetail((d) => ({ ...d, videoUrl: e.target.value }))}
                />
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Select Sites</label>
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
                          if (detail.sites) setErrors((prev) => ({ ...prev, sites: "" }));
                          setDetail((prevDetail) => {
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
                {errors.sites && <div className="alert alert-danger mt-2">{errors.sites}</div>}
              </div>

              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Select Category</label>
                <div
                  style={{
                    maxHeight: "150px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                >
                  {availableCategories.map((category) => (
                    <label key={category._id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={category._id}
                        checked={detail.categories.includes(category._id)}
                        onChange={() => {
                          if (detail.categories) setErrors((prev) => ({ ...prev, categories: "" }));
                          setDetail((prevDetail) => {
                            const isSelected = prevDetail.categories.includes(category._id);
                            return {
                              ...prevDetail,
                              categories: isSelected
                                ? prevDetail.categories.filter((id) => id !== category._id)
                                : [...prevDetail.categories, category._id],
                            };
                          });
                        }}
                      />
                      <span className="form-check-label">{category.name}</span>
                    </label>
                  ))}
                </div>
                {errors.categories && <div className="alert alert-danger mt-2">{errors.categories}</div>}
              </div>

              <div className="mb-3">
                <label className="row">
                  <span className="col">Is Testimonial Active?</span>
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
                  <span className="col">Is Testimonial Global?</span>
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
                  {!id ? "Add Testimonial" : "Update Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
