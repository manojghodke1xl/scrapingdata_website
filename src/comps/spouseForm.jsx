import { useEffect, useState } from 'react';

export default function SpouseForm({ value, onSubmit, goBack }) {
  const [spouse, setSpouse] = useState({ firstname: '', dateofbirth: '', mobilenumber: '', haschildren: false });

  useEffect(() => {
    if (value) setSpouse(value);
  }, [value]);

  const handleChange = (e) => setSpouse((d) => ({ ...d, [e.target.name]: e.target.value }));

  return (
    <div className="card-body">
      <h2 className="h2 text-center mb-4">Spouse Form</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(spouse);
        }}>
        <div className="mb-3">
          <label className="form-label required">First Name</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            placeholder="First Name"
            value={spouse.firstname}
            onChange={handleChange}
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
            value={spouse.dateofbirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label required">Mobile Number (WhatsApp)</label>
          <input
            type="number"
            name="mobilenumber"
            className="form-control"
            placeholder="Mobile Number WhatsApp"
            value={spouse.mobilenumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label required">Children ?</label>
          <div className="form-selectgroup form-selectgroup-boxes d-flex flex-column">
            <label className="form-selectgroup-item flex-fill">
              <input
                type="radio"
                name="haschildren"
                className="form-selectgroup-input"
                checked={!spouse.haschildren}
                onChange={() => setSpouse((d) => ({ ...d, haschildren: false }))}
                required
              />
              <div className="form-selectgroup-label d-flex align-items-center p-3">
                <div className="me-3">
                  <span className="form-selectgroup-check" />
                </div>
                <div>
                  <span className="payment payment-provider-visa payment-xs me-2" />
                  No
                </div>
              </div>
            </label>
            <label className="form-selectgroup-item flex-fill">
              <input
                type="radio"
                name="haschildren"
                className="form-selectgroup-input"
                checked={spouse.haschildren}
                onChange={() => setSpouse((d) => ({ ...d, haschildren: true }))}
                required
              />
              <div className="form-selectgroup-label d-flex align-items-center p-3">
                <div className="me-3">
                  <span className="form-selectgroup-check" />
                </div>
                <div>
                  <span className="payment payment-provider-mastercard payment-xs me-2" />
                  Yes
                </div>
              </div>
            </label>
          </div>
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
