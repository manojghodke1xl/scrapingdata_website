import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { getFeedbackByIdApi } from "../../apis/feedback-apis";
import { formatDateTime } from "../../utils/function";

const FeedbackSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status, data } = await getFeedbackByIdApi(id);
      if (status) {
        setFeedback(data.feedback);
      } else {
        alert({ type: "warning", text: data });
      }
    })()
      .catch((error) => alert({ type: "danger", text: error.message }))
      .finally(() => setLoading(false));
  }, [alert, id, setLoading]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-body">
            <h2 className="mb-4">Feedback Details</h2>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title mb-0">Customer Details</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Customer Name: </strong> {feedback?.name}
                </li>
                <li className="list-group-item">
                  <strong>Email: </strong> {feedback?.email}
                </li>
                <li className="list-group-item">
                  <strong>Mobile Number: </strong>
                  {feedback?.ccode ? `${feedback.ccode} ${feedback.mobile}` : ""}
                </li>
                <li className="list-group-item">
                  <strong>Service: </strong> {feedback?.service}
                </li>
                <li className="list-group-item">
                  <strong>Subject: </strong> {feedback?.subject}
                </li>
                <li className="list-group-item">
                  <strong>IP Address: </strong> {feedback?.ipaddress}
                </li>
              </ul>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title mb-0">Additional Information</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Site Name: </strong> {feedback?.site?.name}
                </li>
                <li className="list-group-item">
                  <strong>Date & Time: </strong> {formatDateTime(feedback?.createdAt)}
                </li>
              </ul>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title mb-0">Feedback Message</h3>
              </div>
              <div className="card-body">
                <p className="form-control-plaintext border p-3">{feedback?.feedbackMessage || "Not Provided"}</p>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title mb-0">Request Header</h3>
                <p className="card-subtitle text-muted">
                  Request headers are key-value pairs sent by a client to provide information about the request or the
                  client itself.
                </p>
              </div>
              <div className="card-body">
                <p className="form-control-plaintext border p-3">{feedback?.header || "No header available"}</p>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h3 className="card-title mb-0">User Agent String </h3>
                <p className="card-subtitle text-muted">Identifies the browser, version, and operating system.</p>
              </div>
              <div className="card-body">
                <p className="form-control-plaintext border p-3">
                  {feedback?.uastring || "No User Agent String available"}
                </p>
              </div>
            </div>

            <button className="btn btn-primary mt-4" onClick={() => navigate(-1)}>
              Back to Feedback List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSingle;
