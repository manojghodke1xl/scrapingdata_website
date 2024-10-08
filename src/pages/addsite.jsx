import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function AddSite() {
  const navigate = useNavigate();
  const { sid = "" } = useParams();

  const { alert, setLoading } = useContext(GlobalContext);

  const [detail, setDetail] = useState({
    name: "",
    host: "",
  });

  useEffect(() => {
    if (sid) {
      setLoading(true);
      (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/site${12}`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        });
        const { data, error } = await res.json();
        if (res.ok) {
          setEnquiries(data.enquiries);
        } else {
          alert({ type: "warning", title: "Warning !", text: error });
        }
      })()
        .catch((error) => alert({ type: "danger", title: "Error !", text: error.message }))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/site`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("auth"),
        },
        body: JSON.stringify(detail),
      });
      const { message, error } = await res.json();
      if (res.ok) {
        alert({ type: "success", title: "Success !", text: message });
        navigate("/site-list");
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
            <h2 className="h2 text-center mb-4">Add Site</h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className="form-label required">Site Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Site Name"
                  value={detail.name}
                  onChange={(e) => setDetail((d) => ({ ...d, name: e.target.value }))}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label required">Site host</label>
                <input
                  type="text"
                  name="host"
                  className="form-control"
                  placeholder="Site host"
                  value={detail.host}
                  onChange={(e) => setDetail((d) => ({ ...d, host: e.target.value }))}
                  required
                />
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  Add Site
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
