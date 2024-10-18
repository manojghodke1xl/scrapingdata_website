import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import useSetTimeout from "../../Hooks/useDebounce";
import { GlobalContext } from "../../GlobalContext";

export default function CategoryList() {
  const navigate = useNavigate();
  const { auth, alert } = useContext(GlobalContext);

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);

  const searchAbleKeys = ["Name"];

  const [err, data] = useSetTimeout(
    "categories",
    page - 1,
    limit,
    searchTerm,
    searchKey
  );

  // const handleCheckboxChange = (catId) => {
  //   setSelectedCategories((prevSelected) => {
  //     let updatedSelected;
  //     if (prevSelected.includes(catId)) {
  //       updatedSelected = prevSelected.filter((id) => id !== catId);
  //     } else {
  //       updatedSelected = [...prevSelected, catId];
  //     }
  //     if (updatedSelected.length !== categories.length) {
  //       setSelectAll(false);
  //     }

  //     return updatedSelected;
  //   });
  // };

  // const handleSelectAll = () => {
  //   if (selectAll) {
  //     setSelectedCategories([]);
  //   } else {
  //     setSelectedCategories(categories.map((category) => category._id));
  //   }
  //   setSelectAll(!selectAll);
  // };

  const headers = [{ label: "Name" }, { label: "Actions" }];

  const rows = categories.map((category) => [
    category.name,
    <button
      key={category._id}
      onClick={() => navigate(`/edit-category/${category._id}`)}
      className="btn btn-primary me-1"
    >
      Edit
    </button>,
  ]);

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
              <button
                onClick={() => navigate("/add-category")}
                className="btn btn-primary "
              >
                Add Category
              </button>
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
    </div>
  );
}
