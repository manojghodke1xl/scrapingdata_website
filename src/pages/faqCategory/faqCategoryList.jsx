import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import useSetTimeout from "../../Hooks/useDebounce";
import { formatDateTime } from "../../utils/function";
import TruncatableField from "../../comps/modals/truncatableField";

const FaqCategoryList = () => {
  const navigate = useNavigate();
  const { alert } = useContext(GlobalContext);
  const [faqCategories, setFaqCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const searchAbleKeys = ["Name"];

  const [err, data] = useSetTimeout("faq-category", page - 1, limit, searchTerm, searchKey);

  const headers = [{ label: "Name" }, { label: "Created Date" }, { label: "Updated Date" }, { label: "Actions" }];

  const rows = faqCategories.map((category) => {
    const { _id, name, createdAt, updatedAt } = category;
    return {
      _id,
      name: <TruncatableField title={"Name"} content={name} maxLength={50} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt),
      actions: (
        <button key={_id} onClick={() => navigate(`/edit-faq-category/${_id}`)} className="btn btn-primary me-1">
          Edit
        </button>
      ),
    };
  });

  useEffect(() => {
    if (data) {
      setFaqCategories(data.faqCategories);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", text: err.message });
    }
  }, [alert, data, err]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Faq Categories</h3>
            <div className="card-options">
              <button onClick={() => navigate("/add-faq-category")} className="btn btn-primary ">
                Add Faq Category
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
};
export default FaqCategoryList;
