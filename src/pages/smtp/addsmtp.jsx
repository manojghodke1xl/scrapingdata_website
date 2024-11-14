import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext';
import { addSmtpApi, getSmtpByIdApi, updateSmtpApi } from '../../apis/smtp-apis';
import Addnote from '../../comps/addnote';
import { addSMTPNote, editSMTPNote } from '../notes/notes-message';

export default function AddSmtp() {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);

  const [errors, setErrors] = useState({});

  const [smtpDetails, setSmtpDetails] = useState({
    name: "",
    host: "",
    port: "",
    secure: "None",
    user: "",
    password: "",
  });

  const smtpSecure = ["SSL", "TLS", "STARTTLS"];

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getSmtpByIdApi(id);
        if (status) {
          const { ...rest } = data.smtp;
          setSmtpDetails({ ...rest, password: "" });
        } else {
          alert({ type: 'warning', text: data });
        }
      })()
        .catch((error) => alert({ type: 'danger', text: error.message }))
        .finally(() => setLoading(false));
    }
  }, [id, alert, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!smtpDetails.name) newErrors.name = "Name is required";
    if (!smtpDetails.host) newErrors.host = "Host is required";
    if (smtpDetails.secure === "") newErrors.secure = "Security protocol is required.";
    if (!smtpDetails.port) newErrors.port = "Port is required";
    if (!smtpDetails.user) newErrors.user = "User is required";
    if (!smtpDetails.password && !id) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetails = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updateSmtpApi(id, smtpDetails) : addSmtpApi(smtpDetails));
      if (status) {
        alert({ type: 'success', text: data.message });
        navigate('/smtp-list');
      } else {
        alert({ type: 'warning', text: data });
      }
    } catch (error) {
      alert({ type: 'danger', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{!id ? 'Add SMTP' : 'Edit SMTP'}</h2>
            <form onSubmit={handleDetails}>
              <div className="mb-3">
                <label className={!id ? 'form-label required' : 'form-label'}>Name</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Title"
                  value={smtpDetails.name}
                  onChange={(e) => {
                    setSmtpDetails((d) => ({ ...d, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Sender Email</label>
                <input
                  type="email"
                  name="senderEmail"
                  className={`form-control ${errors.senderEmail ? "is-invalid" : ""}`}
                  placeholder="Sender Email"
                  value={smtpDetails.senderEmail}
                  onChange={(e) => {
                    setSmtpDetails((d) => ({ ...d, senderEmail: e.target.value }));
                    if (errors.senderEmail) setErrors((prev) => ({ ...prev, senderEmail: "" }));
                  }}
                />
                {errors.senderEmail && <div className="invalid-feedback">{errors.senderEmail}</div>}
              </div>
              <div className="mb-3">
                <label className={!id ? 'form-label required' : 'form-label'}>Host</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errors.host ? 'is-invalid' : ''}`}
                  placeholder="Title"
                  value={smtpDetails.host}
                  onChange={(e) => {
                    setSmtpDetails((d) => ({ ...d, host: e.target.value }));
                    if (errors.host) setErrors((prev) => ({ ...prev, host: '' }));
                  }}
                />
                {errors.host && <div className="invalid-feedback">{errors.host}</div>}
              </div>
              <div className="mb-3">
                <label className={!id ? 'form-label required' : 'form-label'}>Port</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.port ? 'is-invalid' : ''}`}
                  placeholder="Port"
                  value={smtpDetails.port}
                  onChange={(e) => {
                    setSmtpDetails((d) => ({ ...d, port: e.target.value }));
                    if (errors.port) setErrors((prev) => ({ ...prev, port: '' }));
                  }}
                />
                {errors.port && <div className="invalid-feedback">{errors.port}</div>}
              </div>
              <div className="mb-3">
                <label className={!id ? 'form-label required' : 'form-label'}>Security Protocol</label>
                <select
                  name="secure"
                  className={`form-select ${errors.secure ? 'is-invalid' : ''}`}
                  value={smtpDetails.secure}
                  onChange={(e) => {
                    if (errors.secure) setErrors((prev) => ({ ...prev, secure: '' }));
                    setSmtpDetails((d) => ({ ...d, secure: e.target.value }));
                  }}
                >
                  <option value="">Select</option>
                  {smtpSecure.map((s, i) => (
                    <option
                      key={i}
                      value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className={!id ? 'form-label required' : 'form-label'}>User</label>
                <input
                  type="text"
                  name="user"
                  className={`form-control ${errors.user ? 'is-invalid' : ''}`}
                  placeholder="User"
                  value={smtpDetails.user}
                  onChange={(e) => {
                    setSmtpDetails((d) => ({ ...d, user: e.target.value }));
                    if (errors.user) setErrors((prev) => ({ ...prev, user: '' }));
                  }}
                />
                {errors.user && <div className="invalid-feedback">{errors.user}</div>}
              </div>
              <div className="mb-3">
                <label className={!id ? 'form-label required' : 'form-label'}>Password</label>
                <input
                  type="text"
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Password"
                  value={smtpDetails.password}
                  onChange={(e) => {
                    setSmtpDetails((d) => ({ ...d, password: e.target.value }));
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Edit Smtp" : "Add Smtp"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {!id ? <Addnote des={addSMTPNote} /> : <Addnote des={editSMTPNote} />}
    </div>
  );
}
