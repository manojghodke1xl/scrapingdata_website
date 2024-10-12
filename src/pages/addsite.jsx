import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function AddSite() {
  const navigate = useNavigate();
  const { id = "" } = useParams();

  const { alert, setLoading } = useContext(GlobalContext);

  const [smtpOptions, setSmtpOptions] = useState([]);
  const [detail, setDetail] = useState({
    name: "",
    host: "",
    isActive: false,
    smtp: "",
    forwardEmails: [],
  });

  useEffect(() => {
    const fetchSmtpOptions = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/smtps`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        setSmtpOptions(data.smtps);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    };

    fetchSmtpOptions();
  }, [alert]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/site/${id}`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        });
        const { data, error } = await res.json();
        if (res.ok) {
          const { name, host, smtp, isActive } = data.site;
          setDetail((prev) => ({ ...prev, name, host, smtp, isActive }));
        } else {
          alert({ type: "warning", title: "Warning !", text: error });
        }
      })()
        .catch((error) =>
          alert({ type: "danger", title: "Error !", text: error.message })
        )
        .finally(() => setLoading(false));
    }
  }, []);

  const handleDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/site${id ? `/${id}` : ""}`,
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
            <h2 className="h2 text-center mb-4">
              {id ? "Edit site" : "Add site"}
            </h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className="form-label ">
                  {id ? (
                    "Site Name"
                  ) : (
                    <label
                      className={!id ? "form-label required" : "form-label"}
                    >
                      Site Name
                    </label>
                  )}
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Site Name"
                  value={detail.name}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, name: e.target.value }))
                  }
                  required={!id}
                />
              </div>
              <div className="mb-3">
                <label className="form-label ">
                  {id ? (
                    "Site host"
                  ) : (
                    <label
                      className={!id ? "form-label required" : "form-label"}
                    >
                      Site host
                    </label>
                  )}
                </label>
                <input
                  type="text"
                  name="host"
                  className="form-control"
                  placeholder="Site host"
                  value={detail.host}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, host: e.target.value }))
                  }
                  required={!id}
                />
              </div>
              <div className="mb-3">
                <label className="form-label ">
                  {id ? (
                    "Site host"
                  ) : (
                    <label
                      className={!id ? "form-label required" : "form-label"}
                    >
                      Forward Emails
                    </label>
                  )}
                </label>
                <input
                  type="text"
                  name="eamil"
                  className="form-control"
                  placeholder="Email"
                  value={detail.forwardEmails}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, forwardEmails: e.target.value }))
                  }
                  required={!id}
                />
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>
                  SMTP
                </label>
                <select
                  name="smtp"
                  className="form-control"
                  placeholder="SMTP"
                  value={detail.smtp}
                  onChange={(e) =>
                    setDetail((d) => ({ ...d, smtp: e.target.value }))
                  }
                  required={!id}
                >
                  {smtpOptions.map((smtp, index) => (
                    <option key={index} value={smtp._id}>
                      {smtp.name}
                    </option>
                  ))}
                </select>
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
                  {id ? "Update Site" : "Add Site"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
