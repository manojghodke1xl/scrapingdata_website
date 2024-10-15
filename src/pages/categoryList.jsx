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
  const [categorys, setCategorys] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const searchAbleKeys = ["name", "email"];

  const [err, data] = useSetTimeout(
    "categories",
    page - 1,
    limit,
    searchTerm,
    searchKey
  );

  const headers = [{ label: "Name" }];
  const openDeleteModal = (id) => {
    setCategoryToDelete(id);
    setModalOpen(true);
  };

  const rows = categorys.map((category) => [
    category.name,
    <div key={category._id}>
      <button
        onClick={() => navigate(`/add-category/${category._id}`)}
        className="btn btn-primary me-1"
      >
        View
      </button>
      <button
        onClick={() => openDeleteModal(category._id)}
        className="btn btn-danger "
      >
        Delete
      </button>
    </div>,
  ]);

  const deleteCategoryList = async () => {
    if (!categoryToDelete) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/category/${categoryToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );
      const { error } = await res.json();
      if (res.ok) {
        setCategorys((prevLists) =>
          prevLists.filter((list) => list._id !== categoryToDelete)
        );
        alert({
          type: "success",
          title: "Deleted!",
          text: "Mailing list has been deleted.",
        });
      } else {
        alert({ type: "danger", title: "Error!", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error!", text: error.message });
    } finally {
      setLoading(false);
      setModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  useLayoutEffect(() => {
    if (!auth.isSuperAdmin) navigate("/dashboard");
  }, [auth, navigate]);

  useEffect(() => {
    if (data) {
      setCategorys(data.categorys);
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
            <h3 className="card-title">All Category List</h3>
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
              onEntriesChange={setLimit}
              totalCount={totalCount}
            />
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={deleteCategoryList}
        message="Are you sure you want to delete this mailing list? "
      />
    </div>
  );
}
