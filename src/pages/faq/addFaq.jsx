import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { useContext, useEffect, useState } from "react";
import useGetAllSites from "../../Hooks/useGetAllSites";
import { getAllFaqCategoriesApi } from "../../apis/faqCategory-apis";
import { addFaqApi, getFaqByIdApi, updateFaqApi } from "../../apis/faq-apis";

const AddFaq = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const availableSites = useGetAllSites();

  const [errors, setErrors] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllFaqCategories, setSelectAllFaqCategories] = useState(false);
  const [availableFaqCategories, setAvailableFaqCategories] = useState([]);
  const [faqDetails, setFaqDetails] = useState({
    question: "",
    answer: "",
    isActive: true,
    isGlobal: false,
    sites: [],
    faqCategories: [],
  });

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllFaqCategoriesApi();
      if (status) setAvailableFaqCategories(data.faqCategories);
      else alert({ type: "warning", text: data });
    })().catch((error) => alert({ type: "danger", text: error.message }));
  }, [alert]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        const { status, data } = await getFaqByIdApi(id);
        if (status) {
          const { sites, ...rest } = data.faq;
          setFaqDetails((prev) => ({ ...prev, ...rest, sites: sites.map((s) => s._id) }));
        } else alert({ type: "warning", text: data });
      })()
        .catch((error) => alert({ type: "danger", text: error.message }))
        .finally(() => setLoading(false));
    }
  }, [alert, id, setLoading]);

  const validate = () => {
    const errors = {};
    if (!faqDetails.question) errors.question = "Please enter question.";
    if (!faqDetails.answer) errors.answer = "Please enter answer.";
    if (!faqDetails.sites.length) errors.sites = "Please select at least one site.";
    if (!faqDetails.faqCategories.length) errors.faqCategories = "Please select at least one faq category.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const { status, data } = await (id ? updateFaqApi(id, faqDetails) : addFaqApi(faqDetails));
      if (status) {
        alert({ type: "success", text: data.message });
        navigate("/faq-list");
      } else alert({ type: "warning", text: data });
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) setFaqDetails((prev) => ({ ...prev, sites: [] }));
    else
      setFaqDetails((prev) => ({
        ...prev,
        sites: availableSites.map((site) => site._id),
      }));

    setSelectAll(!selectAll);
  };

  const handleSelectAllFaqCategoriesChange = () => {
    if (selectAllFaqCategories) setFaqDetails((prev) => ({ ...prev, faqCategories: [] }));
    else
      setFaqDetails((prev) => ({
        ...prev,
        faqCategories: availableFaqCategories.map((faqCategory) => faqCategory._id),
      }));
    setSelectAllFaqCategories(!selectAllFaqCategories);
  };

  const isAllSelected = faqDetails.sites.length === availableSites.length;
  const isAllSelectedFaqCategories = faqDetails.faqCategories.length === availableFaqCategories.length;

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{!id ? "Add Faq" : "Edit Faq"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Question</label>
                <textarea
                  className={`form-control ${errors.question ? "is-invalid" : ""}`}
                  name="question"
                  rows={3}
                  placeholder="Question.."
                  value={faqDetails.question}
                  onChange={(e) => {
                    setFaqDetails((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }));
                    if (errors.question) setErrors((prev) => ({ ...prev, question: "" }));
                  }}
                />
                {errors.question && <div className="invalid-feedback mt-2">{errors.question}</div>}
              </div>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label"}>Answer</label>
                <textarea
                  className={`form-control ${errors.answer ? "is-invalid" : ""}`}
                  name="answer"
                  rows={6}
                  placeholder="Answer.."
                  value={faqDetails.answer}
                  onChange={(e) => {
                    setFaqDetails((prev) => ({
                      ...prev,
                      answer: e.target.value,
                    }));
                    if (errors.answer) setErrors((prev) => ({ ...prev, answer: "" }));
                  }}
                />
                {errors.answer && <div className="invalid-feedback mt-2">{errors.answer}</div>}
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
                        checked={faqDetails.sites.includes(site._id)}
                        onChange={() => {
                          setFaqDetails((prevDetail) => {
                            const isSelected = prevDetail.sites.includes(site._id);
                            return {
                              ...prevDetail,
                              sites: isSelected
                                ? prevDetail.sites.filter((id) => id !== site._id)
                                : [...prevDetail.sites, site._id],
                            };
                          });
                          if (errors.sites) setErrors((prev) => ({ ...prev, sites: "" }));
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
                    Select Faq Categories
                  </label>
                  <label className="form-check mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={isAllSelectedFaqCategories}
                      onChange={handleSelectAllFaqCategoriesChange}
                    />
                    <span className="form-check-label">Select All</span>
                  </label>
                </div>
                <div className={`form-multi-check-box ${errors.faqCategories ? "is-invalid" : ""}`}>
                  {availableFaqCategories.map((category) => (
                    <label key={category._id} className="form-check">
                      <input
                        className={`form-check-input ${errors.faqCategories ? "is-invalid" : ""}`}
                        type="checkbox"
                        value={category._id}
                        checked={faqDetails.faqCategories.includes(category._id)}
                        onChange={() => {
                          setFaqDetails((prevDetail) => {
                            const isSelected = prevDetail.faqCategories.includes(category._id);
                            return {
                              ...prevDetail,
                              faqCategories: isSelected
                                ? prevDetail.faqCategories.filter((id) => id !== category._id)
                                : [...prevDetail.faqCategories, category._id],
                            };
                          });
                          if (errors.faqCategories) setErrors((prev) => ({ ...prev, faqCategories: "" }));
                        }}
                      />
                      <span className="form-check-label">{category.name}</span>
                    </label>
                  ))}
                </div>
                {errors.faqCategories && <div className="invalid-feedback mx-2 mb-2">{errors.faqCategories}</div>}
              </div>

              {/* <div className="mb-3">
                <label className="row">
                  <span className="col">Is Faq Active?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={faqDetails.isActive}
                        onChange={() =>
                          setFaqDetails((prev) => ({
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
                  <span className="col">Is Faq Global?</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={faqDetails.isGlobal}
                        onChange={() =>
                          setFaqDetails((prev) => ({
                            ...prev,
                            isGlobal: !prev.isGlobal,
                          }))
                        }
                      />
                    </label>
                  </span>
                </label>
              </div> */}
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  {!id ? "Add" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddFaq;
