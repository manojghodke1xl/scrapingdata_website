import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { addCaseStudyApi, getCaseStudyById, updateCaseStudyApi } from "../../apis/caseStudy-apis";
import useGetAllSites from "../../Hooks/useGetAllSites";
import { uploadFile } from "../../utils/fileUpload";
import Addnote from "../../comps/addnote";
import { addCasestudyNote, editAdminNote } from "../notes/notes-message";

export default function AddCaseStudy() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const availableSites = useGetAllSites();

  const [caseStudyDetails, setCaseStudyDetails] = useState({
    title: "",
    sdesc: "",
    ldesc: "",
    image: "",
    pdf: "",
    mailSubject: "",
    mailBody: "",
    isActive: true,
    isGlobal: false,
    sites: [],
  });
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getCaseStudyById(id);
        if (status) {
          const { image, pdf, sites, ...rest } = data.casestudy;

          setCaseStudyDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            pdfFile: pdf,
            imageFile: image,
          }));
        } else {
          alert({ type: "warning", text: data });
        }
      })()
        .catch((error) => alert({ type: "danger", text: error.message }))
        .finally(() => setLoading(false));
    }
  }, [id, alert, setLoading]);

  const validate = () => {
    const newErrors = {};
    if (!caseStudyDetails.title.trim()) newErrors.title = "Title is required";
    if (!caseStudyDetails.sites.length) newErrors.sites = "Minimum one site is required";
    if (!caseStudyDetails.mailSubject.trim()) newErrors.mailSubject = "Subject is required";
    if (!caseStudyDetails.mailBody.trim()) newErrors.mailBody = "Body is required";
    if (!caseStudyDetails.image) newErrors.image = "Image is required";
    if (!caseStudyDetails.pdf) newErrors.pdf = "PDF is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = await (id
        ? updateCaseStudyApi(id, caseStudyDetails)
        : addCaseStudyApi(caseStudyDetails));
      if (status) {
        alert({ type: "success", text: data.message });
        navigate("/casestudy-list");
      } else {
        alert({ type: "warning", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = ({ e, isImage = false, isPdf = false }) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile({
        file,
        isImage,
        isPdf,
        alert,
        setDetails: setCaseStudyDetails,
        fieldName: isImage ? "image" : "pdf",
      });
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) setCaseStudyDetails((prev) => ({ ...prev, sites: [] }));
    else
      setCaseStudyDetails((prev) => ({
        ...prev,
        sites: availableSites.map((site) => site._id),
      }));

    setSelectAll(!selectAll);
  };

  const isAllSelected = caseStudyDetails.sites.length === availableSites.length;

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{id ? "Edit Casestudy" : "Add Casestudy"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label "}>Title</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  placeholder="Title"
                  value={caseStudyDetails.title}
                  onChange={(e) => {
                    setCaseStudyDetails((d) => ({
                      ...d,
                      title: e.target.value,
                    }));
                    if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
                  }}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Short Description</label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={3}
                  placeholder="Description.."
                  value={caseStudyDetails.sdesc}
                  onChange={(e) =>
                    setCaseStudyDetails((d) => ({
                      ...d,
                      sdesc: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Long Description</label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={6}
                  placeholder="Description.."
                  value={caseStudyDetails.ldesc}
                  onChange={(e) =>
                    setCaseStudyDetails((d) => ({
                      ...d,
                      ldesc: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className={id ? "form-label d-flex justify-content-between" : "form-label required"}>
                  Upload Image
                  {id && caseStudyDetails.imageFile && (
                    <a href={caseStudyDetails.imageFile.url} download={caseStudyDetails.imageFile.name} target="_blank">
                      Download Image
                    </a>
                  )}
                </label>
                <input
                  type="file"
                  name="image"
                  className={`form-control ${errors.image ? "is-invalid" : ""}`}
                  onChange={(e) => handleFileUpload({ e, isImage: true })}
                  accept="image/*"
                />
                {errors.image && <div className="invalid-feedback mt-2">{errors.image}</div>}
              </div>
              <div className="mb-3">
                <label className={id ? "form-label d-flex justify-content-between" : "form-label required"}>
                  Upload Pdf
                  {id && caseStudyDetails.pdfFile && (
                    <a href={caseStudyDetails.pdfFile.url} download={caseStudyDetails.pdfFile.name} target="_blank">
                      Download Pdf
                    </a>
                  )}
                </label>
                <input
                  type="file"
                  name="pdf"
                  className={`form-control ${errors.pdf ? "is-invalid" : ""}`}
                  onChange={(e) => handleFileUpload({ e, isPdf: true })}
                  accept="application/pdf"
                />
                {errors.pdf && <div className="invalid-feedback mt-2">{errors.pdf}</div>}
              </div>

              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Email Subject</label>
                <input
                  type="text"
                  name="mailSubject"
                  className={`form-control ${errors.mailSubject ? "is-invalid" : ""}`}
                  placeholder="Email Subject"
                  value={caseStudyDetails.mailSubject}
                  onChange={(e) => {
                    setCaseStudyDetails((d) => ({ ...d, mailSubject: e.target.value }));
                    if (errors.mailSubject) setErrors((prev) => ({ ...prev, mailSubject: "" }));
                  }}
                />
                {errors.mailSubject && <div className="invalid-feedback mt-2">{errors.mailSubject}</div>}
              </div>

              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Email Body</label>

                <textarea
                  className={`form-control ${errors.mailBody ? "is-invalid" : ""}`}
                  rows={3}
                  name="mailBody"
                  placeholder="Email Body"
                  value={caseStudyDetails.mailBody}
                  onChange={(e) => {
                    setCaseStudyDetails((d) => ({ ...d, mailBody: e.target.value }));
                    if (errors.mailBody) setErrors((prev) => ({ ...prev, mailBody: "" }));
                  }}
                />
                {errors.mailBody && <div className="invalid-feedback mt-2">{errors.mailBody}</div>}
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
                        checked={caseStudyDetails.sites.includes(site._id)}
                        onChange={() => {
                          if (caseStudyDetails.sites) setErrors((prev) => ({ ...prev, sites: "" }));
                          setCaseStudyDetails((prevDetail) => {
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
                  <span className="col">Is Casestudy Active?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={caseStudyDetails.isActive}
                        onChange={() =>
                          setCaseStudyDetails((prev) => ({
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
                  <span className="col">Is Casestudy Global?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={caseStudyDetails.isGlobal}
                        onChange={() =>
                          setCaseStudyDetails((prev) => ({
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
      {!id ? <Addnote des={addCasestudyNote} /> : <Addnote des={editAdminNote} />}
    </div>
  );
}
