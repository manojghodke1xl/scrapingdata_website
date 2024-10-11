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
          const { name, desg, text, isGlobal, sites } = data.testimonial; // Get isGlobal from response
          setDetail({ name, desg, text, isGlobal, sites });
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
            <h2 className="h2 text-center mb-4">{id ? "Edit Testimonial" : <label className="form-label required">Add Testimonial</label>}</h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className="form-label required">Name</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={detail.name} // Changed from detail.title to detail.name
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">{id ? "Short Description" : <label className="form-label required">short Description</label>}</label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={6}
                  placeholder="Description.."
                  value={detail.desg} 
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, desg: e.target.value }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">{id ? "Edit Testimonial" : <label className="form-label required">Add Testimonial</label>}</label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={6}
                  placeholder="Description.."
                  value={detail.text} 
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, text: e.target.value }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label ">
                  {id ? (
                    "Select Sites"
                  ) : (
                    <label className="form-label ">{id ? "Selected Sites" : <label className="form-label required">Select Sites</label>}</label>
                  )}
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
                <small className="form-text text-muted">
                  Select multiple sites by checking the boxes.
                </small>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  Add Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
