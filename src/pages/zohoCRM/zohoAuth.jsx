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

export default function ZohoAuth() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const [cuurrantStep, setCuurrantStep] = useState(1);
  const { alert, setLoading } = useContext(GlobalContext);
  const [errors, setErrors] = useState({ forwardEmails: "" });
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

  const handleSubmit = async (sendData) => {
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await updateSiteApi(id, sendData);
      if (status) {
        alert({ type: "success", text: data.message });
        if (sendData.sendCRM) {
          if (data.data?.authURL) {
            window.location.href = data.data?.authURL;
          }
        } else {
          navigate("/site-list");
        }
      } else {
        alert({ type: "warning", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleaSubmitWrapper = (flag) => {
    console.log("the flag is", flag);
    if (!flag) {
      handleSubmit({ ...siteDetails, sendCRM: false });
    } else {
      setSiteDetails({
        ...siteDetails,
        sendCRM: true,
      });
      setCuurrantStep(2);
    }
  };

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">
              {cuurrantStep === 1
                ? "Integrate With Zoho CRM ?"
                : "Add Zoho CRM Credentials"}
            </h2>
            <form>
              <div className="mb-3">
                <label className="form-label required">Site Name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Site Name"
                  value={siteDetails.name}
                  disabled
                />
                {errors.name && (
                  <div className="invalid-feedback mt-2">{errors.name}</div>
                )}
              </div>
              {(() => {
                switch (cuurrantStep) {
                  case 1:
                    return (
                      <div className="form-footer d-flex justify-content-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleaSubmitWrapper(false)}
                          className="btn btn-secondary w-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleaSubmitWrapper(true)}
                          className="btn btn-primary w-100"
                        >
                          Continue
                        </button>
                      </div>
                    );
                  case 2:
                    return (
                      <>
                        <FormField
                          label="Client Id"
                          placeholder="Client Id"
                          value={siteDetails.sendCRMData?.clientId ?? ""}
                          onChange={(value) =>
                            setSiteDetails((prev) => ({
                              ...prev,
                              sendCRMData: {
                                ...prev.sendCRMData,
                                clientId: value,
                              },
                            }))
                          }
                          isInvalid={!!errors.clientId}
                          errorMessage={errors.clientId}
                        />

                        <FormField
                          label="Client Secret"
                          placeholder="Client Secret"
                          value={siteDetails.sendCRMData?.clientSecret ?? ""}
                          onChange={(value) =>
                            setSiteDetails((prev) => ({
                              ...prev,
                              sendCRMData: {
                                ...prev.sendCRMData,
                                clientSecret: value,
                              },
                            }))
                          }
                          isInvalid={!!errors.clientSecret}
                          errorMessage={errors.clientSecret}
                        />
                        <small className="info-container">
                          Use These Links In Zoho API Console
                        </small>
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
                        <div className="form-footer d-flex justify-content-between gap-2">
                          <button
                            type="button"
                            onClick={() => handleSubmit(siteDetails)}
                            className="btn btn-primary w-100"
                          >
                            Continue
                          </button>
                        </div>
                      </>
                    );
                }
              })()}
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
