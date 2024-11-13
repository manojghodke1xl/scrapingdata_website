import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { getSmtpsApi } from "../../apis/smtp-apis";
import { addSiteApi, getSiteByIdApi, updateSiteApi } from "../../apis/site-apis";

export default function AddSite() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const [emailInput, setEmailInput] = useState("");
  const [errors, setErrors] = useState({});
  const [smtpOptions, setSmtpOptions] = useState([]);
  const [siteDetails, setSiteDetails] = useState({
    name: "",
    host: "",
    isActive: true,
    forward: false,
    smtp: "",
    forwardEmails: [],
    webhookUrl: "",
  });

  useEffect(() => {
    (async () => {
      const { status, data } = await getSmtpsApi();
      if (status) {
        setSmtpOptions(data.smtps);
      } else {
        alert({ type: "warning", text: data });
      }
    })();
  }, [alert]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getSiteByIdApi(id);
        if (status) {
          const { forwardEmails, ...rest } = data.site;
          setSiteDetails((prev) => ({
            ...prev,
            ...rest,
            forwardEmails: forwardEmails || [],
          }));
        } else {
          alert({ type: "warning", text: data });
        }
      })()
        .catch((error) => alert({ type: "danger", text: error.message }))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading, alert]);

  const validate = () => {
    const newErrors = {};
    if (!siteDetails.name) newErrors.name = "Name is required";
    if (!siteDetails.host) newErrors.host = "Host is required";
    if (!siteDetails.smtp) newErrors.smtp = "SMTP is required";
    if (siteDetails.forward && !siteDetails.forwardEmails.length)
      newErrors.forwardEmails = "Forward Emails are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetails = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updateSiteApi(id, siteDetails) : addSiteApi(siteDetails));
      if (status) {
        alert({ type: "success", text: data.message });
        navigate("/site-list");
      } else {
        alert({ type: "warning", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const validateAndAddEmail = (e) => {
    e.preventDefault();
    if (emailInput && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setSiteDetails((prev) => ({
        ...prev,
        forwardEmails: [...prev.forwardEmails, emailInput],
      }));
      setEmailInput("");
    }
  };

  const removeEmail = (indexToRemove) => {
    setSiteDetails((prev) => ({
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
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Site Name"
                  value={siteDetails.name}
                  onChange={(e) => {
                    setSiteDetails((d) => ({ ...d, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                />
                {errors.name && <div className="invalid-feedback mt-2">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label required">Site Host</label>
                <input
                  type="text"
                  name="host"
                  className={`form-control ${errors.host ? "is-invalid" : ""}`}
                  placeholder="Site host"
                  value={siteDetails.host}
                  onChange={(e) => {
                    setSiteDetails((d) => ({ ...d, host: e.target.value }));
                    if (errors.host) setErrors((prev) => ({ ...prev, host: "" }));
                  }}
                />
                {errors.host && <div className="invalid-feedback mt-2">{errors.host}</div>}
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
                        checked={siteDetails.forward}
                        onChange={() => setSiteDetails((prev) => ({ ...prev, forward: !prev.forward }))}
                      />
                    </label>
                  </span>
                </label>
              </div>
              {siteDetails.forward && (
                <div className="mb-3">
                  <label className="form-label required">Forward Emails</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.forwardEmails ? "is-invalid" : ""}`}
                    placeholder="Enter email"
                    value={emailInput}
                    onChange={(e) => {
                      if (errors.forwardEmails) setErrors((prev) => ({ ...prev, forwardEmails: "" }));
                      setEmailInput(e.target.value);
                    }}
                  />
                  <button type="button" className="btn btn-primary mt-2" onClick={() => validateAndAddEmail()}>
                    Add Email
                  </button>
                  {errors.forwardEmails && (
                    <div className="invalid-feedback mt-2">Please enter a valid email address.</div>
                  )}

                  <ul className="list-group mt-3">
                    {siteDetails.forwardEmails.map((email, index) => (
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
                  className={`form-select ${errors.smtp ? "is-invalid" : ""}`}
                  value={siteDetails.smtp}
                  onChange={(e) => {
                    setSiteDetails((d) => ({ ...d, smtp: e.target.value }));
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
                {errors.smtp && <div className="invalid-feedback mt-2">{errors.smtp}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Webhook URL</label>
                <input
                  type="url"
                  name="webhookUrl"
                  className="form-control"
                  placeholder="Webhook URL"
                  value={siteDetails.webhookUrl}
                  onChange={(e) => setSiteDetails((d) => ({ ...d, webhookUrl: e.target.value }))}
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
                        checked={siteDetails.isActive}
                        onChange={() => setSiteDetails((prev) => ({ ...prev, isActive: !prev.isActive }))}
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
