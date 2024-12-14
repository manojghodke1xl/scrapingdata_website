import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { getTestimonialById, addTestimonialApi, updateTestimonialApi } from "../../apis/testimonial-apis";
import { getAllCategoriesApi } from "../../apis/category-apis";
import useGetAllSites from "../../Hooks/useGetAllSites";
import { uploadFile } from "../../utils/fileUpload";
import Addnote from "../../comps/addnote";
import { addTestimonialNote, editTestimonialNote } from "../notes/notes-message";

export default function AddTestimonial() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const availableSites = useGetAllSites();

  const [errors, setErrors] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllCategories, setSelectAllCategories] = useState(false);
  const [testimonialDetails, setTestimonialDetails] = useState({
    name: "",
    desg: "",
    text: "",
    type: "text",
    isActive: true,
    isGlobal: false,
    videoBolean: false,
    sites: [],
    categories: [],
    image: "",
    video: "",
    videoUrl: "",
  });
  const [availableCategories, setAvailableCategories] = useState([]);

  const type = ["Text", "Image", "Video"];

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllCategoriesApi();
      if (status) {
        setAvailableCategories(data.categories);
      } else {
        alert({ type: "warning", text: data });
      }
    })().catch((error) => alert({ type: "danger", text: error.message }));
  }, [alert]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getTestimonialById(id);
        if (status) {
          const { image, video, sites, ...rest } = data.testimonial;
          setTestimonialDetails((prev) => ({
            ...prev,
            ...rest,
            sites: sites.map((s) => s._id),
            videoFile: video,
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
    if (!testimonialDetails.name) newErrors.name = "Name is required";
    if (!testimonialDetails.sites.length) newErrors.sites = "At least one site must be selected";
    if (!testimonialDetails.categories.length) newErrors.categories = "At least one category must be selected";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { status, data } = id
        ? await updateTestimonialApi(id, testimonialDetails)
        : await addTestimonialApi(testimonialDetails);
      if (status) {
        alert({ type: "success", text: data.message });
        navigate("/testimonial-list");
      } else {
        alert({ type: "warning", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = ({ e, isImage = false, isVideo = false }) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile({
        file,
        isImage,
        isVideo,
        alert,
        setDetails: setTestimonialDetails,
        fieldName: isImage ? "image" : "video",
      });
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) setTestimonialDetails((prev) => ({ ...prev, sites: [] }));
    else
      setTestimonialDetails((prev) => ({
        ...prev,
        sites: availableSites.map((site) => site._id),
      }));

    setSelectAll(!selectAll);
  };

  const handleSelectAllCategoriesChange = () => {
    if (selectAllCategories) setTestimonialDetails((prev) => ({ ...prev, categories: [] }));
    else
      setTestimonialDetails((prev) => ({
        ...prev,
        categories: availableCategories.map((category) => category._id),
      }));
    setSelectAllCategories(!selectAllCategories);
  };

  const isAllSelected = testimonialDetails.sites.length === availableSites.length;
  const isAllCategoriesSelected = testimonialDetails.categories.length === availableCategories.length; // New check for categories

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{!id ? "Add Testimonial" : "Edit Testimonial"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Name</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Title"
                  value={testimonialDetails.name}
                  onChange={(e) =>
                    setTestimonialDetails((d) => ({
                      ...d,
                      name: e.target.value,
                    }))
                  }
                />
                {errors.name && <div className="invalid-feedback mt-2">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Short Description</label>
                <textarea
                  className="form-control"
                  name="example-textarea-input"
                  rows={6}
                  placeholder="Description.."
                  value={testimonialDetails.desg}
                  onChange={(e) =>
                    setTestimonialDetails((d) => ({
                      ...d,
                      desg: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label required">Select Type</label>
                <select
                  className="form-select"
                  value={testimonialDetails.type}
                  onChange={(e) =>
                    setTestimonialDetails((d) => ({
                      ...d,
                      type: e.target.value,
                    }))
                  }
                >
                  {type.map((t, i) => (
                    <option key={i} value={t.toLowerCase()}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {testimonialDetails.type === "text" && (
                <div className="mb-3">
                  <label className={id ? "form-label" : "form-label required"}>Text</label>
                  <textarea
                    className="form-control"
                    name="example-textarea-input"
                    rows={6}
                    placeholder="Text.."
                    value={testimonialDetails.text}
                    onChange={(e) =>
                      setTestimonialDetails((d) => ({
                        ...d,
                        text: e.target.value,
                      }))
                    }
                  />
                </div>
              )}

              {testimonialDetails.type === "image" && (
                <div className="mb-3">
                  <label className={id ? "form-label d-flex justify-content-between" : "form-label required"}>
                    Upload Image
                    {id && testimonialDetails.imageFile && (
                      <a
                        href={testimonialDetails.imageFile.url}
                        download={testimonialDetails.imageFile.name}
                        target="_blank"
                      >
                        Download Image
                      </a>
                    )}
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    onChange={(e) => handleFileUpload({ e, isImage: true })}
                    accept="image/*"
                  />
                </div>
              )}
              {testimonialDetails.type === "video" && (
                <>
                  <div className="mb-3">
                    <label className="row">
                      <span className="col">Switch to Url?</span>
                      <span className="col-auto">
                        <label className="form-check form-check-single form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={testimonialDetails.videoBolean}
                            onChange={() =>
                              setTestimonialDetails((prev) => ({
                                ...prev,
                                videoBolean: !prev.videoBolean,
                              }))
                            }
                          />
                        </label>
                      </span>
                    </label>
                  </div>
                  {testimonialDetails.videoBolean === false ? (
                    <div className="mb-3">
                      <label className={id ? "form-label d-flex justify-content-between" : "form-label required "}>
                        Upload Video
                        {id && testimonialDetails.videoFile && (
                          <a
                            href={testimonialDetails.videoFile.url}
                            download={testimonialDetails.videoFile.name}
                            target="_blank"
                          >
                            Download Video
                          </a>
                        )}
                      </label>

                      <input
                        type="file"
                        name="video"
                        className="form-control"
                        onChange={(e) => handleFileUpload({ e, isVideo: true })}
                        accept="video/*"
                      />
                    </div>
                  ) : (
                    <div className="mb-3">
                      <label className={id ? "form-label" : "form-label required"}>video URL</label>
                      <input
                        type="url"
                        name="videoUrl"
                        className="form-control"
                        placeholder="video URL"
                        value={testimonialDetails.videoUrl}
                        onChange={(e) =>
                          setTestimonialDetails((d) => ({
                            ...d,
                            videoUrl: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}
                </>
              )}

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
                        checked={testimonialDetails.sites.includes(site._id)}
                        onChange={() => {
                          setTestimonialDetails((prevDetail) => {
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
                {errors.sites && <div className="invalid-feedback mx-2 mb-2">{errors.sites}</div>}
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-3">
                  <label className={!id ? "form-label required mb-0 me-2" : "form-label mb-0 me-2"}>
                    Select Testimonial Category
                  </label>
                  <label className="form-check mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={isAllCategoriesSelected}
                      onChange={handleSelectAllCategoriesChange}
                    />
                    <span className="form-check-label">Select All</span>
                  </label>
                </div>
                <div className={`form-multi-check-box ${errors.categories ? "is-invalid" : ""}`}>
                  {availableCategories.map((category) => (
                    <label key={category._id} className="form-check">
                      <input
                        className={`form-check-input ${errors.categories ? "is-invalid" : ""}`}
                        type="checkbox"
                        value={category._id}
                        checked={testimonialDetails.categories.includes(category._id)}
                        onChange={() => {
                          setTestimonialDetails((prevDetail) => {
                            const isSelected = prevDetail.categories.includes(category._id);
                            return {
                              ...prevDetail,
                              categories: isSelected
                                ? prevDetail.categories.filter((id) => id !== category._id)
                                : [...prevDetail.categories, category._id],
                            };
                          });
                        }}
                      />
                      <span className="form-check-label">{category.name}</span>
                    </label>
                  ))}
                </div>
                {errors.categories && <div className="invalid-feedback mx-2 mb-2">{errors.categories}</div>}
              </div>

              <div className="mb-3">
                <label className="row">
                  <span className="col">Is Testimonial Active?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={testimonialDetails.isActive}
                        onChange={() =>
                          setTestimonialDetails((prev) => ({
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
                  <span className="col">Is Testimonial Global?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={testimonialDetails.isGlobal}
                        onChange={() =>
                          setTestimonialDetails((prev) => ({
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
                  {!id ? "Add" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {!id ? <Addnote des={addTestimonialNote} /> : <Addnote des={editTestimonialNote} />}
    </div>
  );
}
