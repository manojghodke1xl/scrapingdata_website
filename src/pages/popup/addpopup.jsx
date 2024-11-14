import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { getAllGuidesApi } from "../../apis/guide-apis";
import { getAllCaseStudyApi } from "../../apis/caseStudy-apis";
import { getPopupById } from "../../apis/popup-apis";
import { addPopupApi, updatePopupApi } from "../../apis/site-apis";
import useGetAllSites from "../../Hooks/useGetAllSites";
import { uploadFile } from "../../utils/fileUpload";

export default function AddPopup() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const availableSites = useGetAllSites();
  const [popupDetails, setPopupDetails] = useState({
    name: "",
    position: "",
    onPageLoad: false,
    onPageUnload: false,
    afterPageLoad: 1,
    atPageScroll: 0,
    offOnceSubmited: false,
    againWhenCanceled: 1,
    showOnDeviceType: "all",
    publishDate: new Date().toISOString().slice(0, 16),
    archiveDate: new Date().toISOString().slice(0, 16),
    contentType: "basic",
    title: "",
    desc: "",
    allGlobalGuides: false,
    allSiteGuides: false,
    moreGuides: [],
    allGlobalCaseStudy: false,
    allSiteCaseStudy: false,
    moreCaseStudies: [],
    isActive: true,
    site: "",
  });

  const [contentDetials, setContentDetials] = useState([]);
  const [errors, setErrors] = useState({});

  const positions = ["Center-Popup", "Topbar-Notifications"];
  const deviceTypes = ["All", "Desktop", "Mobile"];
  const contentTypes = ["Basic", "Guide", "Casestudy"];

  useEffect(() => {
    (async () => {
      const { status, data } = await (popupDetails.contentType === "guide"
        ? getAllGuidesApi()
        : popupDetails.contentType === "casestudy"
        ? getAllCaseStudyApi()
        : Promise.resolve({ status: false }));
      if (status) {
        popupDetails.contentType === "guide"
          ? setContentDetials(data.guides)
          : popupDetails.contentType === "casestudy"
          ? setContentDetials(data.casestudies)
          : "";
      } else if (data) {
        alert({ type: "warning", text: data });
      }
    })();
  }, [alert, popupDetails.contentType]);

  const validate = () => {
    const newErrors = {};
    if (!popupDetails.name) newErrors.name = "Name is required";
    if (!popupDetails.position) newErrors.position = "Position is required";
    if (!popupDetails.site) newErrors.site = "At least one site must be selected";
    if (!popupDetails.position) newErrors.position = "At least one position must be selected";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getPopupById(id);
        if (status) {
          const { publishDate, archiveDate, ...rest } = data.popup;
          const [formattedPublishDate, formattedArchiveDate] = [new Date(publishDate), new Date(archiveDate)].map(
            (date) => date.toISOString().slice(0, 16)
          );
          setPopupDetails((prev) => ({
            ...prev,
            ...rest,
            publishDate: formattedPublishDate,
            archiveDate: formattedArchiveDate,
          }));
        } else {
          alert({ type: "warning", text: data });
        }
      })()
        .catch((error) => alert({ type: "danger", text: error.message }))
        .finally(() => setLoading(false));
    }
  }, [id, alert, setLoading]);

  const handleSelection = (checked, id) => {
    const refProp =
      popupDetails.contentType === "guide"
        ? "moreGuides"
        : popupDetails.contentType === "casestudy"
        ? "moreCaseStudies"
        : "";
    setPopupDetails({
      ...popupDetails,
      [refProp]: checked ? popupDetails[refProp].concat(id) : popupDetails[refProp].filter((_id) => id !== _id),
    });
  };

  const handleDetails = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id ? updatePopupApi(id, popupDetails) : addPopupApi(popupDetails));
      if (status) {
        alert({ type: "success", text: data.message });
        navigate("/popup-list");
      } else {
        alert({ type: "warning", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e, isImage, isPdf) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile({
        file,
        isImage,
        isPdf,
        alert,
        setDetails: setPopupDetails,
        fieldName: "image",
      });
    }
  };

  return (
    <div className="page-body">
      <div className="container container py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{id ? "Edit Popup" : "Add Popup"}</h2>
            <form onSubmit={handleDetails}>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label required">Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Name"
                    value={popupDetails.name}
                    onChange={(e) => {
                      setPopupDetails((d) => ({ ...d, name: e.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                  />
                  {errors.name && <div className="invalid-feedback mt-2">{errors.name}</div>}
                </div>
                <div className="col-md-3">
                  <label className="form-label required">Position</label>
                  <select
                    className={`form-select ${errors.position ? "is-invalid" : ""}`}
                    value={popupDetails.position}
                    onChange={(e) => {
                      setPopupDetails((d) => ({
                        ...d,
                        position: e.target.value,
                      }));
                      if (errors.position) setErrors((prev) => ({ ...prev, position: "" }));
                    }}
                  >
                    <option value={""}>Select</option>
                    {positions.map((position, i) => (
                      <option key={i} value={position.toLowerCase()}>
                        {position}
                      </option>
                    ))}
                  </select>
                  {errors.position && <div className="invalid-feedback mt-2">{errors.position}</div>}
                </div>
                <div className="col-md-3">
                  <label className="form-label">After Page Load</label>
                  <input
                    type="number"
                    name="afterPageLoad"
                    className="form-control"
                    placeholder="After Page Load"
                    value={popupDetails.afterPageLoad}
                    onChange={(e) =>
                      setPopupDetails((d) => ({
                        ...d,
                        afterPageLoad: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">At Page Scroll</label>
                  <input
                    type="number"
                    name="atPageScroll"
                    className="form-control"
                    placeholder="At Page Scroll"
                    value={popupDetails.atPageScroll}
                    onChange={(e) =>
                      setPopupDetails((d) => ({
                        ...d,
                        atPageScroll: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Again When Canceled</label>
                  <input
                    type="number"
                    name="againWhenCanceled"
                    className="form-control"
                    placeholder="Again When Canceled"
                    value={popupDetails.againWhenCanceled}
                    onChange={(e) =>
                      setPopupDetails((d) => ({
                        ...d,
                        againWhenCanceled: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label required">Device Type</label>
                  <select
                    className="form-select"
                    value={popupDetails.showOnDeviceType}
                    onChange={(e) =>
                      setPopupDetails((d) => ({
                        ...d,
                        showOnDeviceType: e.target.value,
                      }))
                    }
                  >
                    {deviceTypes.map((device, i) => (
                      <option key={i} value={device.toLowerCase()}>
                        {device}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Publish Date</label>
                  <input
                    type="datetime-local"
                    name="publishDate"
                    className="form-control"
                    placeholder="Title"
                    value={popupDetails.publishDate}
                    onChange={(e) => setPopupDetails((d) => ({ ...d, publishDate: e.target.value }))}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Archive Date</label>
                  <input
                    type="datetime-local"
                    name="archiveDate"
                    className="form-control"
                    placeholder="Title"
                    value={popupDetails.archiveDate}
                    onChange={(e) => setPopupDetails((d) => ({ ...d, archiveDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label required">Content Type</label>
                  <select
                    className="form-select"
                    value={popupDetails.contentType}
                    onChange={(e) =>
                      setPopupDetails((d) => ({
                        ...d,
                        contentType: e.target.value,
                      }))
                    }
                  >
                    {contentTypes.map((contentType, i) => (
                      <option key={i} value={contentType.toLowerCase()}>
                        {contentType}
                      </option>
                    ))}
                  </select>
                </div>
                {popupDetails.contentType === "basic" ? (
                  <>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Title"
                        value={popupDetails.title}
                        onChange={(e) =>
                          setPopupDetails((d) => ({
                            ...d,
                            title: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Upload Image</label>
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={(e) => handleFileUpload(e, true, false, false)}
                        accept="image/*"
                      />
                    </div>
                  </>
                ) : (
                  <> </>
                )}
                <div className="col-md-3 mb-3">
                  <label className="form-label">Settings</label>
                  <div className="popup-form-multi-check-box">
                    <label className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={popupDetails.onPageLoad}
                        onChange={() =>
                          setPopupDetails((prev) => ({
                            ...prev,
                            onPageLoad: !prev.onPageLoad,
                          }))
                        }
                      />
                      <span className="form-check-label">On Page Load</span>
                    </label>

                    <label className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={popupDetails.onPageUnload}
                        onChange={() =>
                          setPopupDetails((prev) => ({
                            ...prev,
                            onPageUnload: !prev.onPageUnload,
                          }))
                        }
                      />
                      <span className="form-check-label">On Page Unload</span>
                    </label>

                    <label className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={popupDetails.offOnceSubmited}
                        onChange={() =>
                          setPopupDetails((prev) => ({
                            ...prev,
                            offOnceSubmited: !prev.offOnceSubmited,
                          }))
                        }
                      />
                      <span className="form-check-label">Off Once Submited</span>
                    </label>
                    {popupDetails.contentType === "guide" && (
                      <>
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={popupDetails.allGlobalGuides}
                            onChange={() =>
                              setPopupDetails((prev) => ({
                                ...prev,
                                allGlobalGuides: !prev.allGlobalGuides,
                              }))
                            }
                          />
                          <span className="form-check-label">All Global Guides</span>
                        </label>
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={popupDetails.allSiteGuides}
                            onChange={() =>
                              setPopupDetails((prev) => ({
                                ...prev,
                                allSiteGuides: !prev.allSiteGuides,
                              }))
                            }
                          />
                          <span className="form-check-label">All Site Guides</span>
                        </label>
                      </>
                    )}
                    {popupDetails.contentType === "casestudy" && (
                      <>
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={popupDetails.allGlobalCaseStudies}
                            onChange={() =>
                              setPopupDetails((prev) => ({
                                ...prev,
                                allGlobalCaseStudies: !prev.allGlobalCaseStudies,
                              }))
                            }
                          />
                          <span className="form-check-label">All Global CaseStudies</span>
                        </label>
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={popupDetails.allSiteCaseStudies}
                            onChange={() =>
                              setPopupDetails((prev) => ({
                                ...prev,
                                allSiteCaseStudies: !prev.allSiteCaseStudies,
                              }))
                            }
                          />
                          <span className="form-check-label">All Site CaseStudies</span>
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {(popupDetails.contentType === "guide" || popupDetails.contentType === "casestudy") && (
                  <div className="col-md-3">
                    <label className="form-label">
                      {popupDetails.contentType === "guide" ? "Additional Guides" : "Additional Case Study"}
                    </label>
                    <div className="popup-form-multi-check-box">
                      {contentDetials.map((data) => (
                        <label key={data._id} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={
                              popupDetails.contentType === "guide"
                                ? popupDetails.moreGuides.includes(data._id)
                                : popupDetails.moreCaseStudies.includes(data._id)
                            }
                            onChange={(e) => handleSelection(e.target.checked, data._id)}
                          />
                          <span className="form-check-label">{data.title}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="col-md-3">
                  <label className="form-label required">Select site</label>
                  <select
                    className={`form-select ${errors.site ? "is-invalid" : ""}`}
                    value={popupDetails.site}
                    onChange={(e) => {
                      setPopupDetails((d) => ({
                        ...d,
                        site: e.target.value,
                      }));
                      if (errors.site) setErrors((prev) => ({ ...prev, site: "" }));
                    }}
                  >
                    <option value={""}>Select</option>
                    {availableSites.map((site, i) => (
                      <option key={i} value={site._id}>
                        {site.name}
                      </option>
                    ))}
                  </select>
                  {errors.site && <div className="invalid-feedback mt-2">{errors.site}</div>}
                </div>

                {popupDetails.contentType === "basic" && (
                  <div className=" col-md-6 mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="example-textarea-input"
                      rows={4}
                      placeholder="Description.."
                      value={popupDetails.desc}
                      onChange={(e) => setPopupDetails((d) => ({ ...d, desc: e.target.value }))}
                    />
                  </div>
                )}

                <div className="col-md-3 mb-3">
                  <label className="form-label">Popup Status</label>
                  <label className="row">
                    <span className="col">Is Popup active ?</span>
                    <span className="col-auto">
                      <label className="form-check form-check-single form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={popupDetails.isActive}
                          onChange={() =>
                            setPopupDetails((prev) => ({
                              ...prev,
                              isActive: !prev.isActive,
                            }))
                          }
                        />
                      </label>
                    </span>
                  </label>
                </div>
              </div>
              <div className="form-footer ">
                <button type="submit" className="btn btn-primary d-block mx-auto">
                  {id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
