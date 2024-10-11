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
    sites: [],
    isBlocked: false,
    isSuperAdmin: false,
  });
  const [availableSites, setAvailableSites] = useState([]);

  useEffect(() => {
    const fetchAvailableSites = async () => {
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
    };

    fetchAvailableSites();
  }, [alert]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchAdminDetails = async () => {
        try {
          console.log("fetch Api call");
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/admin/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: localStorage.getItem("auth"),
              },
            }
          );
          const { data, error } = await res.json();
          if (res.ok) {
            const { name, email, isSuperAdmin, sites, isBlocked } = data.admin;
            setDetail((prev) => ({
              ...prev,
              name,
              email,
              isBlocked,
              isSuperAdmin,
              sites: isSuperAdmin
                ? availableSites.map((s) => s._id)
                : sites.map((s) => s._id),
            }));
          } else {
            alert({ type: "warning", title: "Warning !", text: error });
          }
        } catch (error) {
          alert({ type: "danger", title: "Error !", text: error.message });
        } finally {
          setLoading(false);
        }
      };
      fetchAdminDetails();
    }
  }, [id, availableSites, alert, setLoading]);

  const handleDetails = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      email: detail.email,
      name: detail.name,
      isBlocked: detail.isSuperAdmin ? false : detail.isBlocked,
      isSuperAdmin: detail.isSuperAdmin,
      ...(id ? {} : { password: detail.password }), // Set password only if not editing
      ...(detail.isSuperAdmin || !id
        ? { sites: availableSites.map((site) => site._id) }
        : { sites: detail.sites }),
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("auth"),
          },
          body: JSON.stringify(requestData),
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

  const handleSiteSelection = (siteId) => {
    setDetail((prev) => ({
      ...prev,
      sites: prev.sites.includes(siteId)
        ? prev.sites.filter((id) => id !== siteId)
        : [...prev.sites, siteId],
    }));
  };

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">
              {id ? "Edit Admin" : "Add Admin"}
            </h2>
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
                    setDetail((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label required">Admin Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Admin Email"
                  value={detail.email}
                  onChange={(e) =>
                    setDetail((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Admin Password{" "}
                  {id ? "(Leave blank to keep current password)" : ""}
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Admin Password"
                  value={detail.password}
                  onChange={(e) =>
                    setDetail((prev) => ({ ...prev, password: e.target.value }))
                  }
                  required={!id}
                />
              </div>

              <div className="mb-3">
                <div className="form-label required">Select Sites</div>
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
                        checked={detail.sites.includes(site._id)}
                        onChange={() => handleSiteSelection(site._id)}
                        disabled={detail.isSuperAdmin}
                      />
                      <span className="form-check-label">{site.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {!detail.isSuperAdmin && (
                <div className="mb-3">
                  <label className="row">
                    <span className="col">Is admin blocked?</span>
                    <span className="col-auto">
                      <label className="form-check form-check-single form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={detail.isBlocked}
                          onChange={() =>
                            setDetail((prev) => ({
                              ...prev,
                              isBlocked: !prev.isBlocked,
                            }))
                          }
                        />
                      </label>
                    </span>
                  </label>
                </div>
              )}

              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Update Admin" : "Add Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
