import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";

export default function AddAdmin() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { auth, alert, setLoading } = useContext(GlobalContext);

  const [detail, setDetail] = useState({
    email: "",
    name: "",
    password: "",
    sites: [],
    isBlocked: false,
    isSuperAdmin: false,
  });
  const [availableSites, setAvailableSites] = useState([]);
  const [errors, setErrors] = useState({});

  useLayoutEffect(() => {
    if (!auth.isSuperAdmin) navigate("/dashboard");
  }, [auth, navigate]);

  useEffect(() => {
    const fetchAvailableSites = async () => {
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
    };

    fetchAvailableSites();
  }, [alert]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchAdminDetails = async () => {
        try {
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
            const { name, email, isSuperAdmin, isBlocked, sites } = data.admin;
            setDetail((prev) => ({
              ...prev,
              name,
              email,
              isBlocked,
              isSuperAdmin,
              sites,
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
  }, [id, alert, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!detail.email) newErrors.email = "Email is required";
    if (!detail.name) newErrors.name = "Name is required";
    if (!detail.password && !id) newErrors.password = "Password is required";
    if (!detail.sites.length)
      newErrors.sites = "At least one site must be selected";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { password, ...rest } = detail;
    if (password) rest.password = password;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("auth"),
          },
          body: JSON.stringify(rest),
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
    setDetail((prev) => {
      const isSelected = prev.sites.includes(siteId);
      return {
        ...prev,
        sites: isSelected
          ? prev.sites.filter((id) => id !== siteId)
          : [...prev.sites, siteId],
      };
    });
  };

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">
              {id ? "Edit Admin" : "Add Admin"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label "}>
                  Admin Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Admin Name"
                  value={detail.name}
                  onChange={(e) => {
                    setDetail((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                />
                {errors.name && (
                  <small className="alert alert-danger mt-2">
                    {errors.name}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label "}>
                  Admin Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Admin Email"
                  value={detail.email}
                  onChange={(e) => {
                    setDetail((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                />
                {errors.email && (
                  <small className="alert alert-danger mt-2">
                    {errors.email}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  Admin Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Admin Password"
                  value={detail.password}
                  onChange={(e) => {
                    setDetail((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                />
                {errors.password && (
                  <small className="alert alert-danger mt-2">
                    {errors.password}
                  </small>
                )}
              </div>
              <div className="mb-3">
                {detail.isSuperAdmin ? (
                  <label className="form-label">All Sites</label>
                ) : (
                  <label className={!id ? "form-label required" : "form-label"}>
                    Select Sites
                  </label>
                )}
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
                        onChange={() => {
                          handleSiteSelection(site._id);
                          if (errors.sites)
                            setErrors((prev) => ({ ...prev, sites: "" }));
                        }}
                        disabled={detail.isSuperAdmin}
                      />
                      <span className="form-check-label">{site.name}</span>
                    </label>
                  ))}
                </div>
                {errors.sites && (
                  <small className="alert alert-danger mt-2">
                    {errors.sites}
                  </small>
                )}
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
