import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function AddCaseStudy() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);

  const [detail, setDetail] = useState({
    title: "",
    sdesc: "",
    ldesc: "",
    isGlobal: false,
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
          const { title, sdesc, ldesc, sites, image, pdf } = data.casestudy;
          setDetail({ title, sdesc, ldesc, sites, image, pdf });
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
      // Ensure image and pdf are provided when adding a new case study
      if (!id && (!detail.image || !detail.pdf)) {
        alert({
          type: "warning",
          title: "Warning !",
          text: "Image and PDF are required for new case studies.",
        });
        setLoading(false);
        return;
      }

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
        alert({ type: "success", title: "Success !", text: message });
        navigate("/casestudy-list");
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
              {id ? "Edit Casestudy" : "Add Casestudy"}
            </h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className="form-label ">
                  {id ? (
                    "Title"
                  ) : (
                    <label className="form-label required">Title</label>
                  )}
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
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {id ? (
                    "Short Description"
                  ) : (
                    <label className="form-label required">
                      Short Description
                    </label>
                  )}
                </label>
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
                <label className="form-label">
                  {id ? (
                    "Long Description"
                  ) : (
                    <label className="form-label required">
                      Long Description
                    </label>
                  )}
                </label>
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
                <label className="form-label ">
                  {id ? (
                    "Upload Image"
                  ) : (
                    <label className="form-label required">Upload Image</label>
                  )}
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={(e) => uploadFile(e, true)}
                  accept="image/*"
                  required={!id} // Required only when adding a new case study
                />
              </div>
              <div className="mb-3">
                <label className="form-label ">
                  {id ? (
                    "Upload Pdf"
                  ) : (
                    <label className="form-label required">Upload Pdf</label>
                  )}
                </label>
                <input
                  type="file"
                  name="pdf"
                  className="form-control"
                  onChange={(e) => uploadFile(e, false)}
                  accept="application/pdf"
                  required={!id} // Required only when adding a new case study
                />
              </div>
              <div className="mb-3">
                <div className="form-label ">
                  {id ? (
                    "Select Sites"
                  ) : (
                    <label className="form-label required">Select Sites</label>
                  )}
                </div>
                <div
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    border: "1px solid #ced4da",
                    padding: "10px",
                  }}
                >
                  {availableSites.map((site) => (
                    <label key={site._id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={
                          detail.isSuperAdmin || detail.sites.includes(site._id)
                        }
                        onChange={() => handleSiteSelection(site._id)}
                        disabled={detail.isSuperAdmin}
                      />
                      <span className="form-check-label">{site.name}</span>
                    </label>
                  ))}
                </div>
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
