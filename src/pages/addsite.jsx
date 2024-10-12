import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function AddSite() {
  const navigate = useNavigate();
  const { id = "" } = useParams();

  const { alert, setLoading } = useContext(GlobalContext);
  const [email, setEmail] = useState("");

  const [smtpOptions, setSmtpOptions] = useState([]);
  const [detail, setDetail] = useState({
    name: "",
    host: "",
    isActive: false,
    forward: false,
    smtp: "",
    forwardEmails: [], // To store emails
  });

  // Fetch SMTP options
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

  // Fetch site details if updating
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
          const { name, host, smtp, isActive, forward, forwardEmails } =
            data.site;
          setDetail((prev) => ({
            ...prev,
            name,
            host,
            smtp,
            isActive,
            forward,
            forwardEmails: forwardEmails || [], // Populate forwardEmails from response
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
  }, [id, setLoading, alert]);

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

  const addEmail = (e) => {
    e.preventDefault();
    if (email) {
      setDetail((d) => ({ ...d, forwardEmails: [...d.forwardEmails, email] }));
      setEmail("");
    }
  };

  const removeEmail = (index) => {
    setDetail((d) => ({
      ...d,
      forwardEmails: d.forwardEmails.filter((_, i) => i !== index),
    }));
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
                <label className={!id ? "form-label required" : "form-label"}>
                  Site Name
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
                <label className={!id ? "form-label required" : "form-label"}>
                  Site host
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
                <label className="row">
                  <span className="col">Forward</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="forward"
                        checked={detail.forward}
                        onChange={() =>
                          setDetail((prev) => ({
                            ...prev,
                            forward: !prev.forward,
                          }))
                        }
                      />
                    </label>
                  </span>
                </label>
              </div>
              {detail.forward === true ? (
                <div className="mb-3">
                  <label className={!id ? "form-label required" : "form-label"}>
                    Forward Emails
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button className="btn btn-primary mt-2" onClick={addEmail}>
                    Add Email
                  </button>
                  <ul className="list-group mt-3">
                    {detail.forwardEmails.map((email, index) => (
                      <li key={index} className="list-group-item">
                        {email}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm float-end"
                          onClick={() => removeEmail(index)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
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
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
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
