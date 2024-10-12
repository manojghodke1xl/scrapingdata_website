import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function AddTestimonial() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);

  const [detail, setDetail] = useState({
    name: "",
    desg: "",
    text: "",
    isActive: false,
    isGlobal: false,
    sites: [],
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
          `${import.meta.env.VITE_API_URL}/testimonial/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("auth"),
            },
          }
        );
        const { data, error } = await res.json();

        if (res.ok) {
          const { name, desg, text, isGlobal, sites, isActive } =
            data.testimonial; // Get isGlobal from response
          setDetail((prev) => ({
            ...prev,
            name,
            desg,
            text,
            isGlobal,
            sites,
            isActive,
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

  const handleDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/testimonial${id ? `/${id}` : ""}`,
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

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">
              {!id ? "Add Testimonial" : "Edit Testimonial"}
            </h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  Name
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={detail.name} // Changed from detail.title to detail.name
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, name: e.target.value }))
                  }
                  required={!id}
                />
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  short Description
                </label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={6}
                  placeholder="Description.."
                  value={detail.desg}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, desg: e.target.value }))
                  }
                  required={!id}
                />
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  Add Testimonial
                </label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={6}
                  placeholder="Description.."
                  value={detail.text}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, text: e.target.value }))
                  }
                  require={!id}
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
