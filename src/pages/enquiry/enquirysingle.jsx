import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { getEnquiryById } from "../../apis/enquiry-apis";
import Addnote from '../../comps/addnote';
import { addEnquiryNote } from '../notes/notes-message';

const Enquirysingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status, data } = await getEnquiryById(id);
      if (status) {
        setEnquiry(data.enquiry);
      } else {
        alert({ type: 'warning', text: data });
      }
    })()
      .catch((error) => alert({ type: 'danger', text: error.message }))
      .finally(() => setLoading(false));
  }, [alert, id, setLoading]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4">Enquiry Details</h2>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title mb-0">Customer Details</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Customer Name:</strong> {enquiry?.name}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {enquiry?.email}
                </li>
                <li className="list-group-item">
                  <strong>Mobile Number:</strong>
                  {enquiry?.ccode ? `${enquiry.ccode} ${enquiry.mobile}` : ""}
                </li>
                <li className="list-group-item">
                  <strong>Service:</strong> {enquiry?.service}
                </li>
                <li className="list-group-item">
                  <strong>Subject:</strong> {enquiry?.subject}
                </li>
                <li className="list-group-item">
                  <strong>IP Address:</strong> {enquiry?.ipaddress}
                </li>
              </ul>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title mb-0">Additional Information</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Site Name:</strong> {enquiry?.site?.name}
                </li>
                <li className="list-group-item">
                  <strong>Date & Time:</strong>{" "}
                  {formatDateTime(enquiry?.createdAt)}
                </li>
              </ul>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title mb-0">Customer Message</h3>
              </div>
              <div className="card-body">
                <p className="form-control-plaintext border p-3">
                  {enquiry?.message || "Not Provided"}
                </p>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title mb-0">Request Header</h3>
                <p className="card-subtitle text-muted">
                Request headers are key-value pairs sent by a client to
                      provide information about the request or the client
                      itself.
                </p>
              </div>
              <div className="card-body">
                <p className="form-control-plaintext border p-3">
                  {enquiry?.header || "No header available"}
                </p>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title mb-0">User Agent String </h3>
                <p className="card-subtitle text-muted">
                  Identifies the browser, version, and operating system.
                </p>
              </div>
              <div className="card-body">
                <p className="form-control-plaintext border p-3">
                  {enquiry?.uastring || "No User Agent String available"}
                </p>
              </div>
            </div>

            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate(-1)}
            >
              Back to Enquiry List
            </button>
          </div>
        </div>
      </div>
      <Addnote des={addEnquiryNote} />
    </div>
  );
};

export default Enquirysingle;
