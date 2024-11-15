import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { getMailingListById } from "../../apis/mailing-apis";
import Addnote from "../../comps/addnote";
import { addMailingNote } from "../notes/notes-message";
import { formatDateTime } from "../../utils/function";

const MailingSingle = () => {
  const { id } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const [mailingList, setMailingList] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status, data } = await getMailingListById(id);
      if (status) {
        setMailingList(data.list);
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
            {mailingList && (
              <>
                <h2 className="mb-4">Mailing List Details</h2>

                {/* Customer Email */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h3 className="card-title mb-0">Customer Email</h3>
                  </div>
                  <div className="card-body">
                    <p className="form-control-plaintext">
                      {mailingList?.email}
                    </p>
                  </div>
                </div>

                {/* Request Header */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h3 className="card-title mb-0">Request Header</h3>
                    <p className="card-subtitle text-muted m-1">
                      Request headers are key-value pairs sent by a client to
                      provide information about the request or the client
                      itself.
                    </p>
                  </div>
                  <div className="card-body">
                    <p className="form-control-plaintext border p-3">
                      {mailingList?.header || "No header available"}
                    </p>
                  </div>
                </div>
                <div className="card mb-4">
                  <div className="card-header">
                    <h3 className="card-title mb-0">User Agent String</h3>
                    <p className="card-subtitle text-muted m-1">
                      Identifies the browser, version, and operating system of a
                      client device.
                    </p>
                  </div>
                  <div className="card-body">
                    <p className="form-control-plaintext border p-3">
                      {mailingList?.uastring ||
                        "No User Agent String available"}
                    </p>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-header">
                    <h3 className="card-title mb-0">Additional Information</h3>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>IP Address:</strong>{" "}
                      {mailingList?.ipaddress || "Not Present"}
                    </li>
                    <li className="list-group-item">
                      <strong>Site Name:</strong>{" "}
                      {mailingList?.site?.name || "No Site Name available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Date & Time:</strong>{" "}
                      {formatDateTime(mailingList?.createdAt) ||
                        "No Date & Time available"}
                    </li>
                  </ul>
                </div>
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => navigate(-1)}
                >
                  Back to Mailing List
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Addnote des={addMailingNote} />
    </div>
  );
};

export default MailingSingle;
