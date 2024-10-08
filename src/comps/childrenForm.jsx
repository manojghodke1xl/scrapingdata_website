import { useEffect, useState } from 'react';

export default function ChildrenForm({ value, onSubmit, goBack }) {
  const [children, setChildren] = useState([{ firstname: '', dateofbirth: '' }]);

  useEffect(() => {
    if (value.length > 0) setChildren(value);
  }, [value]);

  const handleChange = (e, ix) =>
    setChildren((child) => child.map((c, i) => (i === ix ? { ...c, [e.target.name]: e.target.value } : c)));

  return (
    <div className="card-body">
      <h2 className="h2 text-center mb-4">Children Form</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(children);
        }}>
        {children.map((child, ix) => (
          <div key={ix} className="card card-sm my-3">
            <div className="card-header justify-content-between">
              <strong className="fs-4">Child {ix + 1}</strong>
              {ix > 0 && (
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setChildren(children.filter((_, i) => i !== ix))}
                />
              )}
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label required">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  className="form-control"
                  placeholder="First Name"
                  value={child.firstname}
                  onChange={(e) => handleChange(e, ix)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label required">Date Of Birth</label>
                <input
                  type="date"
                  name="dateofbirth"
                  className="form-control"
                  placeholder="Date Of Birth"
                  value={child.dateofbirth}
                  onChange={(e) => handleChange(e, ix)}
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div className="mt-3 text-center">
          <button
            type="button"
            className="btn btn-azure btn-icon"
            onClick={() => setChildren(children.concat({ firstname: '', dateofbirth: '' }))}>
            <svg
              className="icon"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
          </button>
        </div>

        <div className="form-footer d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => goBack()}>
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
