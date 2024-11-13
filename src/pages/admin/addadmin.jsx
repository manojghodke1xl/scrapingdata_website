import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext';
import { getAdminById, addAdminApi, updateAdminApi } from '../../apis/admin-apis';
import useGetAllSites from '../../Hooks/useGetAllSites';
import Addnote from '../../comps/addnote';

export default function AddAdmin() {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { auth, alert, setLoading } = useContext(GlobalContext);

  const [adminDetails, setAdminDetails] = useState({
    email: '',
    name: '',
    password: '',
    sites: [],
    isBlocked: false,
    isSuperAdmin: false,
  });
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({});
  const availableSites = useGetAllSites();

  useLayoutEffect(() => {
    if (!auth.isSuperAdmin) navigate('/dashboard');
  }, [auth, navigate]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getAdminById(id);
        const { sites, ...rest } = data.admin;
        if (status) {
          setAdminDetails((prev) => ({
            ...prev,
            ...rest,
            password: '',
            sites,
          }));
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
    if (!adminDetails.email) newErrors.email = 'Email is required';
    if (!adminDetails.name) newErrors.name = 'Name is required';
    if (!adminDetails.password && !id) newErrors.password = 'Password is required';
    if (!adminDetails.sites.length) newErrors.sites = 'At least one site must be selected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { password, ...rest } = adminDetails;
    if (password) rest.password = password;
    try {
      const { status, data } = await (id ? updateAdminApi(id, rest) : addAdminApi(rest));
      if (status) {
        alert({ type: 'success', text: data.message });
        navigate('/admin-list');
      } else {
        alert({ type: 'warning', text: data });
      }
    } catch (error) {
      alert({ type: 'danger', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSiteSelection = (siteId) => {
    setAdminDetails((prev) => {
      const isSelected = prev.sites.includes(siteId);
      return {
        ...prev,
        sites: isSelected ? prev.sites.filter((id) => id !== siteId) : [...prev.sites, siteId],
      };
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) setAdminDetails((prev) => ({ ...prev, sites: [] }));
    else
      setAdminDetails((prev) => ({
        ...prev,
        sites: availableSites.map((site) => site._id),
      }));

    setSelectAll(!selectAll);
  };

  const isAllSelected = adminDetails.sites.length === availableSites.length;

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{id ? 'Edit Admin' : 'Add Admin'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className={!id ? 'form-label required' : 'form-label '}>Admin Name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Admin Name"
                  value={adminDetails.name}
                  onChange={(e) => {
                    setAdminDetails((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className={!id ? 'form-label required' : 'form-label '}>Admin Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Admin Email"
                  value={adminDetails.email}
                  onChange={(e) => {
                    setAdminDetails((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label className={!id ? 'form-label required' : 'form-label'}>Admin Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Admin Password"
                  value={adminDetails.password}
                  onChange={(e) => {
                    setAdminDetails((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  {adminDetails.isSuperAdmin ? (
                    <label className="form-label">All Sites</label>
                  ) : (
                    <label className={!id ? 'form-label required' : 'form-label'}>Select Sites</label>
                  )}
                  <label className="form-check mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={isAllSelected}
                      onChange={handleSelectAllChange}
                    />
                    <span className="form-check-label">Select All</span>
                  </label>
                </div>
                <div className={`form-multi-check-box ${errors.sites ? 'is-invalid' : ''}`}>
                  {availableSites.map((site) => (
                    <label
                      key={site._id}
                      className="form-check">
                      <input
                        className={`form-check-input ${errors.sites ? 'is-invalid' : ''}`}
                        type="checkbox"
                        checked={adminDetails.isSuperAdmin || adminDetails.sites.includes(site._id)}
                        onChange={() => {
                          handleSiteSelection(site._id);
                          if (errors.sites) setErrors((prev) => ({ ...prev, sites: '' }));
                        }}
                        disabled={adminDetails.isSuperAdmin}
                      />
                      <span className="form-check-label">{site.name}</span>
                    </label>
                  ))}
                </div>
                {errors.sites && <div className="invalid-feedback mx-2 mb-2">{errors.sites}</div>}
              </div>
              {!adminDetails.isSuperAdmin && (
                <div className="mb-3">
                  <label className="row">
                    <span className="col">Is admin blocked?</span>
                    <span className="col-auto">
                      <label className="form-check form-check-single form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={adminDetails.isBlocked}
                          onChange={() =>
                            setAdminDetails((prev) => ({
                              ...prev,
                              isBlocked: !prev.isBlocked,
                            }))
                          }
                        />
                      </label>
                    </span>
                  </label>
                </div>
              )}
              <div className="form-footer">
                <button
                  type="submit"
                  className="btn btn-primary w-100">
                  {id ? 'Update Admin' : 'Add Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {!id ? (
        <Addnote
          des={`This is the Add Admin page. Here, you can add sub-Admins. This page includes fields for adding the sub-Admin's name, email ID, password, and a list of sites where you can select one or multiple sites. It also has a toggle button for blocking the sub-Admin.`}
        />
      ) : (
        <Addnote
          des={`This is the Edit Admin page. Here, you can Edit sub-Admins. This page includes fields for adding the sub-Admin's name, email ID, password, and a list of sites where you can select one or multiple sites. It also has a toggle button for blocking the sub-Admin.`}
        />
      )}
    </div>
  );
}
