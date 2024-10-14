import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
import useSetTimeout from "../Hooks/useDebounce";
export default function SiteList() {
  const navigate = useNavigate();
  const { alert, auth } = useContext(GlobalContext);

  const [sites, setSites] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const searchAbleKeys = ["name", "host"];

  const [err, data] = useSetTimeout(
    "sites",
    page - 1,
    limit,
    searchTerm,
    searchKey
  );

  useEffect(() => {
    if (data) {
      setSites(data.sites);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", title: "Warning!", text: err.message });
    }
  }, [data, err, alert]);

  const headers = [
    { label: "Keys" },
    { label: "Website Name" },
    { label: "Web Address" },
    { label: "Status" },
    { label: "Actions" },
  ];

  const rows = sites.map((site) => [
    site._id,
    site.name,
    site.host,
    site.isActive === true ? (
      <span className="badge bg-success">Active</span>
    ) : (
      <span className="badge bg-danger">Inactive</span>
    ),
    <button
      key={site._id}
      onClick={() => navigate(`/edit-site/${site._id}`)}
      className="btn btn-primary"
    >
      Edit
    </button>,
  ]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Web sites</h3>
            <div className="card-options">
              {auth.isSuperAdmin && (
                <button
                  onClick={() => navigate("/add-site")}
                  className="btn btn-primary "
                >
                  Add Site
                </button>
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
    </div>
  );
}
