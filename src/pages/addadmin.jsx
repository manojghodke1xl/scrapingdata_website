import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function AddAdmin() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);

  const [detail, setDetail] = useState({
    email: "",
    name: "",
    password: "",
    sites: [], // New field for selected sites
  });
  const [availableSites, setAvailableSites] = useState([]); // State to hold available sites

  useEffect(() => {
    // Fetch available sites for selection
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sites`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        setAvailableSites(data.sites); // Assuming the API returns a list of sites
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })();
  }, [alert, setLoading]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/${id}`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        });
        const { data, error } = await res.json();
        if (res.ok) {
          const { name, email, sites } = data.admin;
          setDetail({ name, email, sites }); // Populate existing admin data
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
        `${import.meta.env.VITE_API_URL}/admin${id ? `/${id}` : ""}`,
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
        navigate("/admin-list");
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
            <h2 className="h2 text-center mb-4">Add Admin</h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className="form-label required">Admin Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Admin Name"
                  value={detail.name}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label required">Admin Email</label>
                <input
                  type="email" // Changed to email type for validation
                  name="email"
                  className="form-control"
                  placeholder="Admin Email"
                  value={detail.email}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label required">Admin Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Admin Password"
                  value={detail.password}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, password: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label required">Select Sites</label>
                <select
                  multiple
                  className="form-control"
                  value={detail.sites}
                  onChange={(e) =>
                    setDetail((d) => ({
                      ...d,
                      sites: [...e.target.selectedOptions].map(option => option.value),
                    }))
                  }
                >
                  {availableSites.map((site) => (
                    <option key={site._id} value={site._id}>
                      {site.name}
                    </option>
                  ))}
                </select>
                <small className="form-text text-muted">Hold Ctrl (Windows) or Command (Mac) to select multiple sites.</small>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
