import { useState } from "react";

export default function DuplicateModal({ allsites = [], isOpen, onClose, onConfirm, title, confirmText }) {
  const [selected, setSelected] = useState([]);

  const handleClose = () => {
    setSelected([]);
    onClose(false);
  };

  const handleConfirm = () => {
    onConfirm(selected).finally(() => {
      setSelected([]);
      onClose(false);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-blur fade show d-block ps-0" tabIndex={-1} role="dialog" aria-modal="true">
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" onClick={handleClose} className="btn-close" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <label className="form-label required">Select Sites</label>
                <label className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={allsites.every((site) => selected.includes(site._id))}
                    onChange={(e) => setSelected(e.target.checked ? allsites.map((site) => site._id) : [])}
                  />
                  <span className="form-check-label">Select All</span>
                </label>
              </div>
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  border: "1px solid #ced4da",
                  padding: "10px",
                }}
              >
                {allsites.map((site) => (
                  <label key={site._id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selected.includes(site._id)}
                      onChange={(e) =>
                        setSelected((sel) =>
                          e.target.checked ? sel.concat(site._id) : sel.filter((s) => s !== site._id)
                        )
                      }
                    />
                    <span className="form-check-label">{site.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={handleClose} className="btn btn-link link-secondary">
              Cancel
            </button>
            <button onClick={handleConfirm} className="btn btn-primary ms-auto">
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
