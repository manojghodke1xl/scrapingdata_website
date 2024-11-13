import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext';
import { getEnquiryById } from '../../apis/enquiry-apis';
import Addnote from '../../comps/addnote';

const Enquirysingle = () => {
  const { id } = useParams();
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
          <div className="row g-0">
            {enquiry && (
              <div className="col-12  d-flex flex-column">
                <div className="card-body">
                  <h2 className="mb-4">Enquiry Details</h2>
                  <h3 className="card-title mt-4">Customer Details</h3>
                  <div className="row g-3">
                    <div className="col-md">
                      <div className="form-label">Customer Name</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={enquiry?.name}
                        readOnly
                      />
                    </div>
                    <div className="col-md">
                      <div className="form-label">Customer Email</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={enquiry?.email}
                        readOnly
                      />
                    </div>
                    <div className="col-md">
                      <div className="form-label">Mobile Number</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={!enquiry.ccode ? '' : enquiry?.ccode + ' ' + enquiry?.mobile}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row g-3 mt-2">
                    <div className="col-md">
                      <div className="form-label">Customer Message</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={enquiry?.message}
                        readOnly
                      />
                    </div>
                    <div className="col-md">
                      <div className="form-label">Customer service</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={enquiry?.service}
                        readOnly
                      />
                    </div>
                    <div className="col-md">
                      <div className="form-label">Customer subject</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={enquiry?.subject}
                        readOnly
                      />
                    </div>
                  </div>
                  <h3 className="card-title mt-4">Request header</h3>
                  <p className="card-subtitle">
                    Request headers are key-value pairs sent by a client to provide information about the request or the
                    client itself.
                  </p>
                  <div>
                    <textarea
                      className="form-control"
                      name="example-textarea-input"
                      rows={6}
                      placeholder="Content.."
                      defaultValue={enquiry?.header}
                      readOnly
                    />
                  </div>
                  <h3 className="card-title mt-4">User Agent String</h3>
                  <p className="card-subtitle">
                    A User Agent String identifies the browser, version, and operating system of a client device to web
                    servers.
                  </p>
                  <div>
                    <textarea
                      className="form-control"
                      name="example-textarea-input"
                      rows={1}
                      placeholder="Content.."
                      defaultValue={enquiry?.uastring}
                      readOnly
                    />
                  </div>
                  <div className="row g-3 mt-2">
                    <div className="col-md">
                      <div className="form-label">Ip Address</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={enquiry?.ipaddress}
                        readOnly
                      />
                    </div>
                    <div className="col-md">
                      <div className="form-label">Site Name</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={enquiry?.site?.name}
                        readOnly
                      />
                    </div>
                    <div className="col-md">
                      <div className="form-label">Date Time</div>
                      <input
                        type="datetime-local"
                        className="form-control"
                        defaultValue={enquiry?.createdAt?.slice(0, 16)}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Addnote
        des={`This is the Enquiry Details page. Here, you can find the details of a particular enquiry. This page includes the customer's name, email, mobile number, message, service, and subject. It also displays the request header of the specific website, the user agent string to identify the browser, version, and operating system of the client's device to web servers, the customer's IP address, the website name for that enquiry, and the date and time when the enquiry was created.`}
      />
    </div>
  );
};

export default Enquirysingle;
