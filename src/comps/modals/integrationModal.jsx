const IntegrationModal = ({
  isOpen,
  onClose,
  title,
  url,
  method,
  bodyParams,
  manditoryParams,
  headers,
  responseDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            <div className="card">
              <div className="card-body">
                {method && (
                  <div>
                    <h4>Request Method</h4>
                    <pre>
                      <code>{JSON.stringify(method, null, 2)}</code>
                    </pre>
                  </div>
                )}
                {url && (
                  <div>
                    <h4>Endpoint</h4>
                    <pre>
                      <code>
                        <a
                          className="text-reset"
                          target="_blank"
                          href={`${import.meta.env.VITE_API_URL}${url}`}
                          rel="noopener noreferrer"
                        >
                          {import.meta.env.VITE_API_URL}
                          {url}
                        </a>
                      </code>
                    </pre>
                  </div>
                )}

                {bodyParams && (
                  <div>
                    <h4>Request body Parameters</h4>
                    <pre>
                      <code>{JSON.stringify(bodyParams, null, 2)}</code>
                    </pre>
                  </div>
                )}

                {manditoryParams && (
                  <div>
                    <h4>Mandatory Parameters</h4>
                    <pre>
                      <code>{JSON.stringify(manditoryParams, null, 2)}</code>
                    </pre>
                  </div>
                )}

                {headers && (
                  <div>
                    <h4>Request Headers</h4>
                    <pre>
                      <code>{JSON.stringify(headers, null, 2)}</code>
                    </pre>
                  </div>
                )}
                {responseDetails && (
                  <div>
                    <h4>Response Details</h4>
                    <pre>
                      <code>{JSON.stringify(responseDetails, null, 2)}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;
