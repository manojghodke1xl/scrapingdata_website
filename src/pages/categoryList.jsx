import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import useSetTimeout from "../Hooks/useDebounce";
import { GlobalContext } from "../GlobalContext";
import ConfirmationModal from "../comps/confirmation";

export default function CategoryList() {
  const navigate = useNavigate();
  const { auth, alert, setLoading } = useContext(GlobalContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const searchAbleKeys = ["name"];

  const [err, data] = useSetTimeout("categories", page - 1, limit, searchTerm, searchKey);

  const handleCheckboxChange = (catId) => {
    setSelectedCategories((prevSelected) => {
      let updatedSelected;
      if (prevSelected.includes(catId)) {
        updatedSelected = prevSelected.filter((id) => id !== catId);
      } else {
        updatedSelected = [...prevSelected, catId];
      }
      if (updatedSelected.length !== categories.length) {
        setSelectAll(false);
      }

      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((category) => category._id));
    }
    setSelectAll(!selectAll);
  };

  const headers = [
    {
      label: <input className="form-check-input" type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
    },
    { label: "Name" },
    { label: "Actions" },
  ];

  const rows = categories.map((category) => [
    <input
      key={category._id}
      className="form-check-input"
      type="checkbox"
      checked={selectedCategories.includes(category._id)}
      onChange={() => handleCheckboxChange(category._id)}
    />,
    category.name,
    <button
      key={category._id}
      onClick={() => navigate(`/add-category/${category._id}`)}
      className="btn btn-primary me-1"
    >
      View
    </button>,
  ]);

  const deleteCategoryList = async () => {
    if (!selectedCategories.length) {
      alert({
        type: "warning",
        title: "No Selection",
        text: "Please select at least one enquiry to delete.",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/category`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("auth"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedCategories }),
      });

      const { error } = await res.json();
      if (res.ok) {
        setCategories((prevCategory) => prevCategory.filter((category) => !selectedCategories.includes(category._id)));
        alert({
          type: "success",
          title: "Deleted!",
          text: "Selected category's have been deleted.",
        });
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedCategories([]);
    }
  };

  useLayoutEffect(() => {
    if (!auth.isSuperAdmin) navigate("/dashboard");
  }, [auth, navigate]);

  useEffect(() => {
    if (data) {
      setCategories(data.categorys);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Categories</h3>
            <div className="card-options">
              <button onClick={() => navigate("/add-category")} className="btn btn-primary ">
                Add Category
              </button>
              {selectedCategories.length ? (
                <button onClick={() => setModalOpen(true)} className="btn btn-danger mx-2">
                  Delete Selected
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="table-responsive">
            <Table
              headers={headers}
              rows={rows}
              currentPage={page}
              totalPages={Math.ceil(totalCount / limit)}
              onPageChange={setPage}
              entriesPerPage={limit}
              setSearchTerm={setSearchTerm}
              setSearchKey={setSearchKey}
              searchAbleKeys={searchAbleKeys}
              onEntriesChange={(newLimit) => {
                setLimit(newLimit);
              }}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteCategoryList}
        message={`Are you sure you want to delete selected enquiry? This action cannot be undone.`}
      />
    </div>
  );
}
