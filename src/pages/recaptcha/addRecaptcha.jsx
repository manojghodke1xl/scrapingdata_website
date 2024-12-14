import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { useContext, useEffect, useState } from "react";
import useGetAllSites from "../../Hooks/useGetAllSites";
import { addRecaptchaApi, getRecaptchaByIdApi, updateRecaptchaApi } from "../../apis/recaptcha-apis";

const AddRecaptcha = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const availableSites = useGetAllSites();

  const [recaptcha, setRecaptcha] = useState({
    version: 2,
    sitekey: "",
    secretkey: "",
    sites: [],
    isActive: true,
    isGlobal: false,
  });

  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({});

  const versions = [
    { key: "v2", value: 2 },
    { key: "v3", value: 3 },
  ];

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getRecaptchaByIdApi(id);
        if (status) {
          const { sites, ...rest } = data.recaptcha;
          setRecaptcha((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((site) => site._id),
          }));
        } else alert({ type: "warning", text: "Recaptcha not found" });
      })()
        .catch((error) => alert({ type: "danger", text: error.message }))
        .finally(() => setLoading(false));
    }
  }, [alert, id, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!recaptcha.sitekey.trim()) newErrors.sitekey = "Site key is required";
    if (!recaptcha.secretkey.trim()) newErrors.secretkey = "Secret key is required";
    if (!recaptcha.sites.length) newErrors.sites = "At least one site is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updateRecaptchaApi(id, recaptcha) : addRecaptchaApi(recaptcha));
      if (status) {
        alert({ type: "success", text: data.message });
        navigate("/recaptcha-list");
      } else alert({ type: "warning", text: data });
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) setRecaptcha((prev) => ({ ...prev, sites: [] }));
    else
      setRecaptcha((prev) => ({
        ...prev,
        sites: availableSites.map((site) => site._id),
      }));

    setSelectAll(!selectAll);
  };

  const isAllSelected = recaptcha.sites.length === availableSites.length;

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{id ? "Edit reCAPTCHA" : "Add reCAPTCHA"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label required">Version</label>
                {versions.map((version) => (
                  <div className="form-check form-check-inline" key={version.key}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="version"
                      checked={recaptcha.version === version.value}
                      onChange={() => {
                        setRecaptcha((d) => ({
                          ...d,
                          version: version.value,
                        }));
                      }}
                    />
                    <label className="form-check-label">{version.key}</label>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label "}>Site Key</label>
                <input
                  type="text"
                  name="sitekey"
                  className={`form-control ${errors.sitekey ? "is-invalid" : ""}`}
                  placeholder="Site Key"
                  value={recaptcha.sitekey}
                  onChange={(e) => {
                    setRecaptcha((d) => ({
                      ...d,
                      sitekey: e.target.value,
                    }));
                    if (errors.sitekey) setErrors((prev) => ({ ...prev, sitekey: "" }));
                  }}
                />
                {errors.sitekey && <div className="invalid-feedback">{errors.sitekey}</div>}
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label "}>Secret Key</label>
                <input
                  type="text"
                  name="secretkey"
                  className={`form-control ${errors.secretkey ? "is-invalid" : ""}`}
                  placeholder="Secret Key"
                  value={recaptcha.secretkey}
                  onChange={(e) => {
                    setRecaptcha((d) => ({
                      ...d,
                      secretkey: e.target.value,
                    }));
                    if (errors.secretkey) setErrors((prev) => ({ ...prev, secretkey: "" }));
                  }}
                />
                {errors.secretkey && <div className="invalid-feedback">{errors.secretkey}</div>}
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-3">
                  <label className={!id ? "form-label required mb-0 me-2" : "form-label mb-0 me-2"}>Select Sites</label>
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
                <div className={`form-multi-check-box ${errors.sites ? "is-invalid" : ""}`}>
                  {availableSites.map((site) => (
                    <label key={site._id} className="form-check">
                      <input
                        className={`form-check-input ${errors.sites ? "is-invalid" : ""}`}
                        type="checkbox"
                        value={site._id}
                        checked={recaptcha.sites.includes(site._id)}
                        onChange={() => {
                          if (recaptcha.sites) setErrors((prev) => ({ ...prev, sites: "" }));
                          setRecaptcha((prevDetail) => {
                            const isSelected = prevDetail.sites.includes(site._id);
                            return {
                              ...prevDetail,
                              sites: isSelected
                                ? prevDetail.sites.filter((id) => id !== site._id)
                                : [...prevDetail.sites, site._id],
                            };
                          });
                        }}
                      />
                      <span className="form-check-label">{site.name}</span>
                    </label>
                  ))}
                </div>
                {errors.sites && <div className="invalid-feedback mt-2">{errors.sites}</div>}
              </div>
              <div className="mb-3">
                <label className="row">
                  <span className="col">Is reCAPTCHA Active?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={recaptcha.isActive}
                        onChange={() =>
                          setRecaptcha((prev) => ({
                            ...prev,
                            isActive: !prev.isActive,
                          }))
                        }
                      />
                    </label>
                  </span>
                </label>
              </div>
              <div className="mb-3">
                <label className="row">
                  <span className="col">Is reCAPTCHA Global?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={recaptcha.isGlobal}
                        onChange={() =>
                          setRecaptcha((prev) => ({
                            ...prev,
                            isGlobal: !prev.isGlobal,
                          }))
                        }
                      />
                    </label>
                  </span>
                </label>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecaptcha;
