import { useContext, useEffect, useLayoutEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function AddPopup() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { auth, alert, setLoading } = useContext(GlobalContext);

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
    moreCaseStudy: [],
    isActive: true,
    site: "",
  });

  const [contentDetials, setContentDetials] = useState([]);
  const [availableSites, setAvailableSites] = useState([]);
  const [errors, setErrors] = useState({});

  const positions = ["Center-Popup", "Topbar-Notifications"];
  const deviceTypes = ["All", "Desktop", "Mobile"];
  const contentTypes = ["Basic", "Guide", "Casestudy"];

  useLayoutEffect(() => {
    if (!auth.isSuperAdmin) navigate("/dashboard");
  }, [auth, navigate]);

  useEffect(() => {
    (async () => {
      if (popupDetails.contentType === "guide") {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/allguides`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        });
        const { data, error } = await res.json();
        if (res.ok) {
          setContentDetials(data.guides);
        } else {
          alert({ type: "warning", title: "Warning !", text: error });
        }
      } else if (popupDetails.contentType === "casestudy") {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/allcasestudies`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        });
        const { data, error } = await res.json();
        if (res.ok) {
          setContentDetials(data.casestudies);
        } else {
          alert({ type: "warning", title: "Warning !", text: error });
        }
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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/popup/${id}`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        });
        const { data, error } = await res.json();

        if (res.ok) {
          setPopupDetails((prev) => ({
            ...prev,
            ...data.popup,
          }));
        } else {
          alert({ type: "warning", title: "Warning !", text: error });
        }
      })()
        .catch((error) => alert({ type: "danger", title: "Error !", text: error.message }))
        .finally(() => setLoading(false));
    }
  }, [id, alert, setLoading]);

  useEffect(() => {
    const fetchAvailableSites = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/allSites`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        setAvailableSites(data.sites);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    };

    fetchAvailableSites();
  }, [alert]);

  const handleSelection = (checked, id) => {
    const refProp =
      popupDetails.contentType === "guide"
        ? "moreGuides"
        : popupDetails.contentType === "casestudy"
        ? "moreCaseStudy"
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/popup${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("auth"),
        },
        body: JSON.stringify(popupDetails),
      });
      const { message, error } = await res.json();
      if (res.ok) {
        alert({ type: "success", title: "Success !", text: message });
        navigate("/popup-list");
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error !", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const imageInputRef = useRef(null);

  const uploadFile = async (e, isImage) => {
    const file = e.target.files[0];
    if (!file) return;

    const { name, size, type } = file;

    const validImageTypes = ["image/jpeg", "image/png"];

    if (isImage && !validImageTypes.includes(type)) {
      alert({
        type: "warning",
        title: "Invalid File Type",
        text: "Only PNG or JPEG formats are allowed for image uploads.",
      });
      imageInputRef.current.value = "";
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("auth"),
        },
        body: JSON.stringify({ name, size, mime: type }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to get upload URL");
      }

      const { data } = await res.json();
      const fd = new FormData();
      for (const [key, val] of Object.entries(data.fields)) {
        fd.append(key, val);
      }

      fd.append("file", file);

      const uploadRes = await fetch(data.url, {
        method: "POST",
        body: fd,
      });

      if (!uploadRes.ok) {
        throw new Error("File upload failed");
      }
      const fileId = data._id;

      if (isImage) {
        setPopupDetails((prevDetail) => ({ ...prevDetail, image: fileId }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert({ type: "danger", title: "Error !", text: error.message });
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
                    className="form-control"
                    placeholder="Name"
                    value={popupDetails.name}
                    onChange={(e) => {
                      setPopupDetails((d) => ({ ...d, name: e.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                  />
                  {errors.name && <small className="alert alert-danger mt-2">{errors.name}</small>}
                </div>
                <div className="col-md-3">
                  <label className="form-label required">Position</label>
                  <select
                    className="form-select"
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
                  {errors.position && <small className="alert alert-danger mt-2">{errors.position}</small>}
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
                    onChange={(e) =>
                      setPopupDetails((d) => ({
                        ...d,
                        publishDate: e.target.value,
                      }))
                    }
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
                    onChange={(e) =>
                      setPopupDetails((d) => ({
                        ...d,
                        archiveDate: e.target.value,
                      }))
                    }
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
                        onChange={(e) => uploadFile(e, true)}
                        accept="image/*"
                        ref={imageInputRef}
                      />
                    </div>
                  </>
                ) : (
                  <> </>
                )}
                <div className="col-md-3 mb-3">
                  <label className="form-label">Settings</label>
                  <div
                    style={{
                      maxHeight: "100px",
                      overflowY: "auto",
                      padding: "10px",
                    }}
                  >
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
                          {errors.site && <small className="alert alert-danger mt-2">{errors.site}</small>}
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
                    <div
                      style={{
                        maxHeight: "100px",
                        overflowY: "auto",
                        padding: "10px",
                      }}
                    >
                      {contentDetials.map((data) => (
                        <label key={data._id} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={
                              popupDetails.contentType === "guide"
                                ? popupDetails.moreGuides.includes(data._id)
                                : popupDetails.moreCaseStudy.includes(data._id)
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
                    className="form-select"
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
                  {errors.site && <small className="alert alert-danger mt-2">{errors.site}</small>}
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
                  {id ? "Update Popup" : "Add Popup"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
