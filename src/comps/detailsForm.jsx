import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../GlobalContext';

export default function DetailsForm({ value, onSubmit }) {
  const { auth } = useContext(GlobalContext);

  const [detail, setDetail] = useState({
    firstname: '',
    lastname: '',
    dateofbirth: '',
    mobilenumber: '',
    emailaddress: auth.email,
    ismarried: false,
  });

  useEffect(() => {
    if (value) setDetail(value);
  }, [value]);

  const handleChange = (e) => setDetail((d) => ({ ...d, [e.target.name]: e.target.value }));

  return (
    <div className="card-body">
      <h2 className="h2 text-center mb-4">Details Form</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(detail);
        }}>
        <div className="mb-3">
          <label className="form-label required">First Name</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            placeholder="First Name"
            value={detail.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label required">Last Name</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            placeholder="Last Name"
            value={detail.lastname}
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
            value={detail.dateofbirth}
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
            value={detail.mobilenumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="emailaddress"
            className="form-control"
            placeholder="Email Address"
            value={detail.emailaddress}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label required">Single or Married</label>
          <div className="form-selectgroup form-selectgroup-boxes d-flex flex-column">
            <label className="form-selectgroup-item flex-fill">
              <input
                type="radio"
                name="ismarried"
                className="form-selectgroup-input"
                checked={!detail.ismarried}
                onChange={() => setDetail((d) => ({ ...d, ismarried: false }))}
                required
              />
              <div className="form-selectgroup-label d-flex align-items-center p-3">
                <div className="me-3">
                  <span className="form-selectgroup-check" />
                </div>
                <div>
                  <span className="payment payment-provider-visa payment-xs me-2" />
                  Single
                </div>
              </div>
            </label>
            <label className="form-selectgroup-item flex-fill">
              <input
                type="radio"
                name="ismarried"
                className="form-selectgroup-input"
                checked={detail.ismarried}
                onChange={() => setDetail((d) => ({ ...d, ismarried: true }))}
                required
              />
              <div className="form-selectgroup-label d-flex align-items-center p-3">
                <div className="me-3">
                  <span className="form-selectgroup-check" />
                </div>
                <div>
                  <span className="payment payment-provider-mastercard payment-xs me-2" />
                  Married
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className="form-footer">
          <button
            type="submit"
            className="btn btn-primary w-100">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
