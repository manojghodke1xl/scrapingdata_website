import { useState } from "react";

const TruncatableField = ({ title, content = "", maxLength }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const isTruncated = content.length > maxLength;

  return (
    <>
      <span>
        {isTruncated ? content.substring(0, maxLength) + "..." : content}{" "}
        {isTruncated && (
          <button
            onClick={handleOpen}
            className="btn btn-link p-0"
            style={{ textDecoration: "none" }}
            aria-label="View full content"
          >
            View
          </button>
        )}
      </span>

      {showModal && (
        <div className="modal modal-blur fade show d-block ps-0" tabIndex={-1} role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" onClick={handleClose} className="btn-close" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div
                  className=" d-flex justify-content-between overflow-auto"
                  style={{ maxHeight: "70vh", overflowY: "auto", whiteSpace: "pre-wrap" }}
                >
                  <span>{content}</span>
                </div>
              </div>

              <div className="modal-footer">
                <button onClick={handleClose} className="btn btn-link link-secondary">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TruncatableField;
