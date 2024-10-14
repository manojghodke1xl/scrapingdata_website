import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

const MailingSingle = () => {
  const { id } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);

  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/list/${id}?p=1`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );
      const { data, error } = await res.json();
      if (res.ok) {
        setEnquiry(data.list);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })()
      .catch((error) =>
        alert({ type: "danger", title: "Error !", text: error.message })
      )
      .finally(() => setLoading(false));
  }, [alert, id, setLoading]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="row g-0">
            {enquiry && (
              <div className="col-12  d-flex flex-column">
                <div className="card-body">
                  <h2 className="mb-4">Mailing List Details</h2>

                  <div className="row g-3">
                    <div className="col-md">
                      <div className="form-label">Customer Email</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={enquiry?.email}
                      />
                    </div>
                  </div>

                  <h3 className="card-title mt-4">Request header</h3>
                  <p className="card-subtitle">
                    Request headers are key-value pairs sent by a client to
                    provide information about the request or the client itself.
                  </p>
                  <div>
                    <textarea
                      className="form-control"
                      name="example-textarea-input"
                      rows={6}
                      placeholder="Content ..."
                      defaultValue={enquiry?.header}
                    />
                  </div>

                  <h3 className="card-title mt-4">User Agent String</h3>
                  <p className="card-subtitle">
                    A User Agent String identifies the browser, version, and
                    operating system of a client device to web servers.
                  </p>
                  <div>
                    <textarea
                      className="form-control"
                      name="example-textarea-input"
                      rows={6}
                      placeholder="Content ..."
                      defaultValue={enquiry?.uastring}
                    />
                  </div>

                  <div className="row g-3 mt-2">
                    <div className="col-md">
                      <div className="form-label">Ip Address</div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Not Present ..."
                        defaultValue={enquiry?.ipaddress}
                      />
                    </div>
                    <div className="col-md">
                      <div className="form-label">Site Name</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={enquiry?.site?.name}
                      />
                    </div>
                    <div className="col-md">
                      <div className="form-label">Date Time</div>
                      <input
                        type="datetime-local"
                        className="form-control"
                        defaultValue={enquiry?.createdAt?.slice(0, 16)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailingSingle;
