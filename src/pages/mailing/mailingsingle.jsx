import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext';
import { getMailingListById } from '../../apis/mailing-apis';
import Addnote from '../../comps/addnote';

const MailingSingle = () => {
  const { id } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const [mailingList, setMailingList] = useState(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status, data } = await getMailingListById(id);
      if (status) {
        setMailingList(data.list);
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
            {mailingList && (
              <div className="col-12  d-flex flex-column">
                <div className="card-body">
                  <h2 className="mb-4">Mailing List Details</h2>

                  <div className="row g-3">
                    <div className="col-md">
                      <div className="form-label">Customer Email</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={mailingList?.email}
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
                      placeholder="Content ..."
                      defaultValue={mailingList?.header}
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
                      placeholder="Content ..."
                      defaultValue={mailingList?.uastring}
                      readOnly
                    />
                  </div>

                  <div className="row g-3 mt-2">
                    <div className="col-md">
                      <div className="form-label">Ip Address</div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Not Present ..."
                        defaultValue={mailingList?.ipaddress}
                        readOnly
                      />
                    </div>
                    <div className="col-md">
                      <div className="form-label">Site Name</div>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={mailingList?.site?.name}
                        readOnly
                      />
                    </div>
                    <div className="col-md">
                      <div className="form-label">Date Time</div>
                      <input
                        type="datetime-local"
                        className="form-control"
                        defaultValue={mailingList?.createdAt?.slice(0, 16)}
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
        des={`This is the Mailing List Details page. Here, you can find the details of a particular Mail Detials. This page includes the customer's email. It also displays the request header of the specific website, the user agent string to identify the browser, version, and operating system of the client's device to web servers, the customer's IP address, the website name for that enquiry, and the date and time when the enquiry was created.`}
      />
    </div>
  );
};

export default MailingSingle;
