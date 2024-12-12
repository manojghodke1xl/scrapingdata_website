import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { getSiteByIdApi } from "../../apis/site-apis";

export default function ZohoStatus() {
  const { id = "" } = useParams();
  const [cuurrantStep, setCuurrantStep] = useState("loading");
  const { alert, setLoading } = useContext(GlobalContext);
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
          setSiteDetails(data.site);
          if (data.site.sendCRMData?.isVerfied) setCuurrantStep("success");
          else setCuurrantStep("failed");
        } else alert({ type: "warning", text: data });
      })()
        .catch((error) => alert({ type: "danger", text: error.message }))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading, alert]);

  return (
    <div className="page page-center">
      <div className="container-tight py-4">
        {(() => {
          switch (cuurrantStep) {
            case "loading":
              return <h1>Loading</h1>;
            case "failed":
              return (
                <div className="empty">
                  <div className="empty-header">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="154px"
                      viewBox="0 -960 960 960"
                      width="154px"
                      fill="black"
                    >
                      <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 100q-68 0-123.5 38.5T276-280h66q22-37 58.5-58.5T480-360q43 0 79.5 21.5T618-280h66q-25-63-80.5-101.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
                    </svg>
                  </div>
                  <p className="empty-title">Verification failed. Invalid credentials.</p>
                  <p className="empty-subtitle text-secondary">
                    The Client ID or Secret provided is incorrect. Please verify your credentials and try again.
                  </p>
                  <div className="empty-action">
                    <Link to="/site-list" className="btn btn-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12l14 0"></path>
                        <path d="M5 12l6 6"></path>
                        <path d="M5 12l6 -6"></path>
                      </svg>
                      Take me home
                    </Link>
                  </div>
                </div>
              );
            case "success":
              return (
                <div className="empty">
                  <div className="empty-header">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="154px"
                      viewBox="0 -960 960 960"
                      width="154px"
                      fill="black"
                    >
                      <path d="m80-80 200-560 360 360L80-80Zm132-132 282-100-182-182-100 282Zm370-246-42-42 224-224q32-32 77-32t77 32l24 24-42 42-24-24q-14-14-35-14t-35 14L582-458ZM422-618l-42-42 24-24q14-14 14-34t-14-34l-26-26 42-42 26 26q32 32 32 76t-32 76l-24 24Zm80 80-42-42 144-144q14-14 14-35t-14-35l-64-64 42-42 64 64q32 32 32 77t-32 77L502-538Zm160 160-42-42 64-64q32-32 77-32t77 32l64 64-42 42-64-64q-14-14-35-14t-35 14l-64 64ZM212-212Z" />
                    </svg>
                  </div>
                  <p className="empty-title">Success! Integration Successful</p>
                  <p className="empty-subtitle text-secondary">
                    Zoho CRM has been successfully integrated with your project. All systems are operational.
                  </p>
                  <div className="empty-action">
                    <Link to="/site-list" className="btn btn-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12l14 0"></path>
                        <path d="M5 12l6 6"></path>
                        <path d="M5 12l6 -6"></path>
                      </svg>
                      Take me home
                    </Link>
                  </div>
                </div>
              );
            default:
              return null; // Handle an undefined or unexpected state
          }
        })()}
      </div>
    </div>
  );
}
