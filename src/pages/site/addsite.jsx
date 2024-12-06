import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { getAllSmtpsApi } from "../../apis/smtp-apis";
import {
  addSiteApi,
  getSiteByIdApi,
  updateSiteApi,
} from "../../apis/site-apis";
import Addnote from "../../comps/addnote";
import { addWebsiteNote, editWebsiteNote } from "../notes/notes-message";
import FormField from "../../comps/formField";
import ToggleFormSection from "../../comps/toggleFormSection";

export default function AddSite() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const [emailInput, setEmailInput] = useState("");
  const [errors, setErrors] = useState({ forwardEmails: "" });
  const [smtpOptions, setSmtpOptions] = useState([]);
  const [siteDetails, setSiteDetails] = useState({
    name: "",
    host: "",
    isActive: true,
    smtp: "",
    sendUserEnquiry: false,
    // sendUserEnquiryData: { subject: "", body: "" },
    sendUserMailingList: false,
    // sendUserMailingListData: { subject: "", body: "" },
    sendAdminEnquiry: false,
    // sendAdminEnquiryData: { subject: "", body: "" },
    adminEnquiryEmails: [],
    sendAdminMailingList: false,
    // sendAdminMailingListData: { subject: "", body: "" },
    adminMailingListEmails: [],
    sendCRM: false,
    // sendCRMData: { clientId: "", clientSecret: "" },
    enquiryWebhookUrl: "",
    mailinglistWebhookUrl: "",
  });

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllSmtpsApi();
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
    if (siteDetails.sendUserEnquiry) {
      if (!siteDetails.userEnquiryMailData?.subject) {
        newErrors.subject = "Subject is required";
      }
      if (!siteDetails.userEnquiryMailData?.body) {
        newErrors.body = "Body is required";
      }
    }
    if (siteDetails.sendUserMailingList) {
      if (!siteDetails.userMailingListMailData?.subject) {
        newErrors.subject = "Subject is required";
      }
      if (!siteDetails.userMailingListMailData?.body) {
        newErrors.body = "Body is required";
      }
    }
    if (siteDetails.sendAdminEnquiry) {
      if (!siteDetails.adminEnquiryMailData?.subject) {
        newErrors.subject = "Subject is required";
      }
      if (!siteDetails.adminEnquiryMailData?.body) {
        newErrors.body = "Body is required";
      }
      if (!siteDetails.adminEnquiryEmails.length) {
        newErrors.adminEnquiryEmails = "At least one email is required";
      }
    }
    if (siteDetails.sendAdminMailingList) {
      if (!siteDetails.adminMailingListMailData?.subject) {
        newErrors.subject = "Subject is required";
      }
      if (!siteDetails.adminMailingListMailData?.body) {
        newErrors.body = "Body is required";
      }
      if (!siteDetails.adminMailingListEmails.length) {
        newErrors.adminMailingListEmails = "At least one email is required";
      }
    }
    if (siteDetails.sendCRM) {
      if (!siteDetails.sendCRMData?.clientId) {
        newErrors.clientId = "Client ID is required";
      }
      if (!siteDetails.sendCRMData?.clientSecret) {
        newErrors.clientSecret = "Client Secret is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id
        ? updateSiteApi(id, siteDetails)
        : addSiteApi(siteDetails));
      if (status) {
        alert({ type: "success", text: data.message });
        if (data.data?.authURL)
          return (window.location.href = data.data?.authURL);
        // navigate(data.data?.authURL);
        else return navigate("/site-list");
      } else {
        alert({ type: "warning", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateAndAddInput = (
    e,
    inputValue,
    setInputValue,
    setStateDetails,
    key,
    regexPattern
  ) => {
    e.preventDefault();

    if (inputValue && regexPattern.test(inputValue)) {
      setStateDetails((prev) => ({
        ...prev,
        [key]: [...(prev[key] || []), inputValue],
      }));
      setInputValue("");
      setErrors((prev) => ({ ...prev, forwardEmails: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        forwardEmails: "Please enter a valid email address.",
      }));
    }
  };

  const removeItemAtIndex = (setStateDetails, key, indexToRemove) => {
    setStateDetails((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleAddEmail = (e, key) => {
    validateAndAddInput(
      e,
      emailInput,
      setEmailInput,
      setSiteDetails,
      key,
      emailRegex
    );
  };

  const handleRemoveEmail = (index, key) => {
    removeItemAtIndex(setSiteDetails, key, index);
  };

  const handleMailDataChange = (field, type, value) => {
    setSiteDetails((prev) => ({
      ...prev,
      [field]: { ...prev[field], [type]: value },
    }));
  };

  const handleToggle = (checked, field) => {
    switch (field) {
      case "sendUserEnquiry":
        {
          setSiteDetails((prev) => ({
            ...prev,
            sendUserEnquiry: checked,
            userEnquiryMailData: undefined,
          }));
        }
        break;
      case "sendUserMailingList":
        {
          setSiteDetails((prev) => ({
            ...prev,
            sendUserMailingList: checked,
            userMailingListMailData: undefined,
          }));
        }
        break;
      case "sendAdminEnquiry":
        {
          setSiteDetails((prev) => ({
            ...prev,
            sendAdminEnquiry: checked,
            adminEnquiryEmails: [],
            adminEnquiryMailData: undefined,
          }));
        }
        break;
      case "sendAdminMailingList":
        {
          setSiteDetails((prev) => ({
            ...prev,
            sendAdminMailingList: checked,
            adminMailingListEmails: [],
            adminMailingListMailData: undefined,
          }));
        }
        break;
      case "sendCRM":
        {
          setSiteDetails((prev) => ({
            ...prev,
            sendCRM: checked,
            sendCRMData: undefined,
          }));
        }
        break;
    }
  };

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">
              {id ? "Edit Site" : "Add Site"}
            </h2>
            <form onSubmit={handleSubmit}>
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
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                />
                {errors.name && (
                  <div className="invalid-feedback mt-2">{errors.name}</div>
                )}
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
                    if (errors.host)
                      setErrors((prev) => ({ ...prev, host: "" }));
                  }}
                />
                {errors.host && (
                  <div className="invalid-feedback mt-2">{errors.host}</div>
                )}
              </div>

              <ToggleFormSection
                label="Send User Enquiry Notification"
                toggleState={siteDetails.sendUserEnquiry}
                onToggle={(e) =>
                  handleToggle(e.target.checked, "sendUserEnquiry")
                }
              >
                <FormField
                  label="Subject"
                  value={siteDetails.userEnquiryMailData?.subject ?? ""}
                  onChange={(value) => {
                    handleMailDataChange(
                      "userEnquiryMailData",
                      "subject",
                      value
                    );
                    if (errors.subject)
                      setErrors((prev) => ({ ...prev, subject: "" }));
                  }}
                  isInvalid={!!errors.subject}
                  errorMessage={errors.subject}
                />

                <FormField
                  label="Body"
                  value={siteDetails.userEnquiryMailData?.body ?? ""}
                  onChange={(value) => {
                    handleMailDataChange("userEnquiryMailData", "body", value);
                    if (errors.body)
                      setErrors((prev) => ({ ...prev, body: "" }));
                  }}
                  type="textarea"
                  isInvalid={!!errors.body}
                  errorMessage={errors.body}
                />
              </ToggleFormSection>

              {/* Send User Mailing Notification Section */}
              <ToggleFormSection
                label="Send User Mailing Notification"
                toggleState={siteDetails.sendUserMailingList}
                onToggle={(e) =>
                  handleToggle(e.target.checked, "sendUserMailingList")
                }
              >
                <FormField
                  label="Subject"
                  value={siteDetails.userMailingListMailData?.subject ?? ""}
                  onChange={(value) => {
                    handleMailDataChange(
                      "userMailingListMailData",
                      "subject",
                      value
                    );
                    if (errors.subject)
                      setErrors((prev) => ({ ...prev, subject: "" }));
                  }}
                  isInvalid={!!errors.subject}
                  errorMessage={errors.subject}
                />

                <FormField
                  label="Body"
                  value={siteDetails.userMailingListMailData?.body ?? ""}
                  onChange={(value) => {
                    handleMailDataChange(
                      "userMailingListMailData",
                      "body",
                      value
                    );
                    if (errors.body)
                      setErrors((prev) => ({ ...prev, body: "" }));
                  }}
                  type="textarea"
                  isInvalid={!!errors.body}
                  errorMessage={errors.body}
                />
              </ToggleFormSection>

              <ToggleFormSection
                label="Send Admin Enquiry"
                toggleState={siteDetails.sendAdminEnquiry}
                onToggle={(e) =>
                  handleToggle(e.target.checked, "sendAdminEnquiry")
                }
              >
                <FormField
                  label="Subject"
                  value={siteDetails.adminEnquiryMailData?.subject ?? ""}
                  onChange={(value) => {
                    handleMailDataChange(
                      "adminEnquiryMailData",
                      "subject",
                      value
                    );
                    if (errors.subject)
                      setErrors((prev) => ({ ...prev, subject: "" }));
                  }}
                  isInvalid={!!errors.subject}
                  errorMessage={errors.subject}
                />

                <FormField
                  label="Body"
                  value={siteDetails.adminEnquiryMailData?.body ?? ""}
                  onChange={(value) =>
                    handleMailDataChange("adminEnquiryMailData", "body", value)
                  }
                  type="textarea"
                  isInvalid={!!errors.body}
                  errorMessage={errors.body}
                />

                <FormField
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  value={emailInput}
                  onChange={(value) => {
                    if (errors.forwardEmails) {
                      setErrors((prev) => ({ ...prev, forwardEmails: "" }));
                    }
                    if (errors.adminEnquiryEmails)
                      setErrors((prev) => ({
                        ...prev,
                        adminEnquiryEmails: "",
                      }));
                    setEmailInput(value);
                  }}
                  isInvalid={
                    !!errors.forwardEmails || !!errors.adminEnquiryEmails
                  }
                  errorMessage={
                    errors.forwardEmails || errors.adminEnquiryEmails
                  }
                />
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={(e) => handleAddEmail(e, "adminEnquiryEmails")}
                >
                  Add Email
                </button>

                {/* List of Admin Enquiry Emails */}
                <ul className="list-group mt-3">
                  {siteDetails.adminEnquiryEmails.map((email, index) => (
                    <li key={index} className="list-group-item">
                      {email}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm float-end"
                        onClick={() =>
                          handleRemoveEmail(index, "adminEnquiryEmails")
                        }
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </ToggleFormSection>

              <ToggleFormSection
                label="Send Admin Mailing List"
                toggleState={siteDetails.sendAdminMailingList}
                onToggle={(e) =>
                  handleToggle(e.target.checked, "sendAdminMailingList")
                }
              >
                <FormField
                  label="Subject"
                  value={siteDetails.adminMailingListMailData?.subject ?? ""}
                  onChange={(value) =>
                    handleMailDataChange(
                      "adminMailingListMailData",
                      "subject",
                      value
                    )
                  }
                  isInvalid={!!errors.subject} // Show error if subject is invalid
                  errorMessage={errors.subject} // Display error message for subject
                />

                <FormField
                  label="Body"
                  value={siteDetails.adminMailingListMailData?.body ?? ""}
                  onChange={(value) =>
                    handleMailDataChange(
                      "adminMailingListMailData",
                      "body",
                      value
                    )
                  }
                  type="textarea"
                  isInvalid={!!errors.body} // Show error if body is invalid
                  errorMessage={errors.body} // Display error message for body
                />

                <FormField
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  value={emailInput}
                  onChange={(value) => {
                    if (errors.forwardEmails) {
                      setErrors((prev) => ({ ...prev, forwardEmails: "" }));
                    }
                    if (errors.adminMailingListEmails)
                      setErrors((prev) => ({
                        ...prev,
                        adminMailingListEmails: "",
                      }));
                    setEmailInput(value);
                  }}
                  isInvalid={
                    !!errors.forwardEmails || !!errors.adminMailingListEmails
                  }
                  errorMessage={
                    errors.forwardEmails || errors.adminMailingListEmails
                  }
                />

                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={(e) => handleAddEmail(e, "adminMailingListEmails")}
                >
                  Add Email
                </button>

                {/* List of Admin Mailing List Emails */}
                <ul className="list-group mt-3">
                  {siteDetails.adminMailingListEmails.map((email, index) => (
                    <li key={index} className="list-group-item">
                      {email}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm float-end"
                        onClick={() =>
                          handleRemoveEmail(index, "adminMailingListEmails")
                        }
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </ToggleFormSection>

              <ToggleFormSection
                label="Send CRM"
                toggleState={siteDetails.sendCRM}
                onToggle={(e) => handleToggle(e.target.checked, "sendCRM")}
              >
                <div className="crm-clientid-container">
                  <FormField
                    label="Client Id"
                    placeholder="Client Id"
                    value={siteDetails.sendCRMData?.clientId ?? ""}
                    onChange={(value) =>
                      setSiteDetails((prev) => ({
                        ...prev,
                        sendCRMData: { ...prev.sendCRMData, clientId: value },
                      }))
                    }
                    isInvalid={!!errors.clientId}
                    errorMessage={errors.clientId}
                  />
                  <div className="info-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="blue"
                    >
                      <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                  </div>
                  <div className="info-container">
                    <small>Use These Url In API Condole </small>
                    <FormField
                      label="Homepage URL"
                      placeholder="Homepage URL"
                      value={import.meta.env.VITE_URL}
                      isDisabled={true}
                    />
                    <FormField
                      label="Authorized Redirect URIs"
                      placeholder="Authorized Redirect URIs"
                      value={import.meta.env.VITE_API_URL}
                      isDisabled={true}
                    />
                  </div>
                </div>

                <FormField
                  label="Client Secret"
                  placeholder="Client Secret"
                  value={siteDetails.sendCRMData?.clientSecret ?? ""}
                  onChange={(value) =>
                    setSiteDetails((prev) => ({
                      ...prev,
                      sendCRMData: { ...prev.sendCRMData, clientSecret: value },
                    }))
                  }
                  isInvalid={!!errors.clientSecret}
                  errorMessage={errors.clientSecret}
                />
              </ToggleFormSection>

              <div className="mb-3">
                <label className={id ? "form-label" : "form-label required"}>
                  SMTP
                </label>
                <select
                  name="smtp"
                  className={`form-select ${errors.smtp ? "is-invalid" : ""}`}
                  value={siteDetails.smtp}
                  onChange={(e) => {
                    setSiteDetails((d) => ({ ...d, smtp: e.target.value }));
                    if (errors.smtp)
                      setErrors((prev) => ({ ...prev, smtp: "" }));
                  }}
                >
                  <option value={""}>Select</option>
                  {smtpOptions.map((smtp, index) => (
                    <option key={index} value={smtp._id}>
                      {smtp.name}
                    </option>
                  ))}
                </select>
                {errors.smtp && (
                  <div className="invalid-feedback mt-2">{errors.smtp}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Enquiry Webhook URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={siteDetails.enquiryWebhookUrl}
                  onChange={(e) =>
                    setSiteDetails((d) => ({
                      ...d,
                      enquiryWebhookUrl: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mailing List Webhook URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={siteDetails.mailinglistWebhookUrl}
                  onChange={(e) =>
                    setSiteDetails((d) => ({
                      ...d,
                      mailinglistWebhookUrl: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="row">
                  <span className="col form-label">Is site active?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isActive"
                        checked={siteDetails.isActive}
                        onChange={() =>
                          setSiteDetails((prev) => ({
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
                  {id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {!id ? (
        <Addnote des={addWebsiteNote} />
      ) : (
        <Addnote des={editWebsiteNote} />
      )}
    </div>
  );
}
