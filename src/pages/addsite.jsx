import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function AddSite() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const [emailInput, setEmailInput] = useState("");
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState(false);
  const [smtpOptions, setSmtpOptions] = useState([]);
  const [detail, setDetail] = useState({
    name: "",
    host: "",
    isActive: true,
    forward: false,
    smtp: "",
    forwardEmails: [],
    webhookUrl: "",
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
          const { name, host, smtp, isActive, forward, forwardEmails, webhookUrl } = data.site;
          setDetail((prev) => ({
            ...prev,
            name,
            host,
            smtp,
            webhookUrl,
            isActive,
            forward,
            forwardEmails: forwardEmails || [],
          }));
        } else {
          alert({ type: "warning", title: "Warning !", text: error });
        }
      })()
        .catch((error) => alert({ type: "danger", title: "Error !", text: error.message }))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading, alert]);

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!detail.name) newErrors.name = "Name is required";
    if (!detail.host) newErrors.host = "Host is required";
    if (!detail.smtp) newErrors.smtp = "SMTP is required";
    if (detail.forward && !detail.forwardEmails.length) newErrors.forwardEmails = "Forward Emails are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetails = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/site${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
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

  const validateAndAddEmail = (e) => {
    e.preventDefault();
    if (emailInput && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setDetail((prev) => ({
        ...prev,
        forwardEmails: [...prev.forwardEmails, emailInput],
      }));
      setEmailInput(""); 
      setEmailError(false);
    } else {
      setEmailError(true); 
    }
  };

  const removeEmail = (indexToRemove) => {
    setDetail((prev) => ({
      ...prev,
      forwardEmails: prev.forwardEmails.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{id ? "Edit site" : "Add site"}</h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className="form-label required">Site Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Site Name"
                  value={detail.name}
                  onChange={(e) => {
                    setDetail((d) => ({ ...d, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                />
                {errors.name && <div className="alert alert-danger mt-2">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label required">Site Host</label>
                <input
                  type="text"
                  name="host"
                  className="form-control"
                  placeholder="Site host"
                  value={detail.host}
                  onChange={(e) => {
                    setDetail((d) => ({ ...d, host: e.target.value }));
                    if (errors.host) setErrors((prev) => ({ ...prev, host: "" }));
                  }}
                />
                {errors.host && <div className="alert alert-danger mt-2">{errors.host}</div>}
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
              {detail.forward && (
                <div className="mb-3">
                  <label className="form-label required">Forward Emails</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setEmailError(false);
                    }}
                  />
                  <button className="btn btn-primary mt-2" onClick={validateAndAddEmail}>
                    Add Email
                  </button>
                  {emailError && <div className="alert alert-danger mt-2">Please enter a valid email address.</div>}

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
              )}

              <div className="mb-3">
                <label className={id ? "form-label" : "form-label required"}>SMTP</label>
                <select
                  name="smtp"
                  className="form-control"
                  value={detail.smtp}
                  onChange={(e) => {
                    setDetail((d) => ({ ...d, smtp: e.target.value }));
                    if (errors.smtp) setErrors((prev) => ({ ...prev, smtp: "" }));
                  }}
                >
                  <option value={""}>Select</option>
                  {smtpOptions.map((smtp, index) => (
                    <option key={index} value={smtp._id}>
                      {smtp.name}
                    </option>
                  ))}
                </select>
                {errors.smtp && <div className="alert alert-danger mt-2">{errors.smtp}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Webhook URL</label>
                <input
                  type="url"
                  name="webhookUrl"
                  className="form-control"
                  placeholder="Webhook URL"
                  value={detail.webhookUrl}
                  onChange={(e) => setDetail((d) => ({ ...d, webhookUrl: e.target.value }))}
                />
              </div>

              <div className="mb-3">
                <label className="row">
                  <span className="col">Active</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isActive"
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
                  {id ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
