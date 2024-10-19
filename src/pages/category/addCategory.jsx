import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";

export default function AddCategory() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { alert, setLoading } = useContext(GlobalContext);
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!categoryName) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchAdminDetails = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/category/${id}`, {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("auth"),
            },
          });
          const { data, error } = await res.json();
          if (res.ok) {
            const { name } = data.category;
            setCategoryName(name);
          } else {
            alert({ type: "warning", title: "Warning !", text: error });
          }
        } catch (error) {
          alert({ type: "danger", title: "Error !", text: error.message });
        } finally {
          setLoading(false);
        }
      };
      fetchAdminDetails();
    }
  }, [id, alert, setLoading]);
  console.log(categoryName);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/category${id ? `/${id}` : ""}`, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("auth"),
        },
        body: JSON.stringify({ name: categoryName }),
      });
      const { message, error } = await res.json();
      if (res.ok) {
        alert({ type: "success", title: "Success !", text: message });
        navigate("/category-list");
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error !", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{id ? "Edit Category" : "Add Category"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className={!id ? "form-label required" : "form-label "}>Category Name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Category Name"
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                />
                {errors.name && <div className="invalid-feedback mt-2">{errors.name}</div>}
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Update Category" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
