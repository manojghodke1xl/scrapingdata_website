import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { useContext, useEffect, useState } from "react";
import { addFaqCategoryApi, getFaqCategoryByIdApi, updateFaqCategoryApi } from "../../apis/faqCategory-apis";

const AddFaqCategory = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const [fqaCategoryName, setFqaCategoryName] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!fqaCategoryName) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        try {
          const { status, data } = await getFaqCategoryByIdApi(id);

          if (status) {
            const { name } = data.faqCategory;
            setFqaCategoryName(name);
          } else {
            alert({ type: "warning", text: "Faq Category not found" });
          }
        } catch (error) {
          alert({ type: "danger", text: error.message });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [alert, id, setLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const name = { name: fqaCategoryName };
      const { status, data } = await (id ? updateFaqCategoryApi(id, name) : addFaqCategoryApi(name));
      if (status) {
        alert({ type: "success", text: data.message });
        navigate("/faq-category-list");
      } else {
        alert({ type: "warning", text: data });
      }
    } catch (error) {
      alert({ type: "danger", text: error.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{id ? "Edit Faq Category" : "Add Faq Category"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label "}>Category Name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Category Name"
                  value={fqaCategoryName}
                  onChange={(e) => {
                    setFqaCategoryName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                />
                {errors.name && <div className="invalid-feedback mt-2">{errors.name}</div>}
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

export default AddFaqCategory;
