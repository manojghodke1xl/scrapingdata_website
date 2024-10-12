import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function AddGuide() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);

  const [detail, setDetail] = useState({
    title: "",
    desc: "",
    isActive: false,
    sites: [],
    image: "",
    pdf: "",
  });
  const [availableSites, setAvailableSites] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sites`, {
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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/guide/${id}`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        });
        const { data, error } = await res.json();

        if (res.ok) {
          const { title, desc, sites, image, pdf, isActive } = data.guide;
          setDetail((prev) => ({ ...prev, title, desc, sites, image, pdf, isActive }));
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

  const handleDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/guide${id ? `/${id}` : ""}`,
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
        alert({ type: "success", title: "Success !", text: message });
        navigate("/guide-list");
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error !", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (e, isImage) => {
    const file = e.target.files[0];
    if (!file) return;

    const { name, size, type } = file;

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
              {id ? "Edit Guide" : "Add Guide"}
            </h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={detail.title}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, title: e.target.value }))
                  }
                  required={!id}
                />
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={6}
                  placeholder="Description.."
                  value={detail.desc}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, desc: e.target.value }))
                  }
                  required={!id}
                />
              </div>

              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={(e) => uploadFile(e, true)}
                  accept="image/*"
                  required={!id}
                />
              </div>

              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  Upload PDF
                </label>
                <input
                  type="file"
                  name="pdf"
                  className="form-control"
                  onChange={(e) => uploadFile(e, false)}
                  accept="application/pdf"
                  required={!id}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Select Sites</label>
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
              </div>
              <div className="mb-3">
                <label className="row">
                  <span className="col">Site Status</span>
                  <span className="col-auto">
                    <label className="form-check form-check-singl  e form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked=""
                        name="status"
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
