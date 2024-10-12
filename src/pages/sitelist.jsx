import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";
export default function SiteList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [sites, setSites] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0); // To track the total number of sites

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/sites?p=${page - 1}&n=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );
      const { data, error } = await res.json();
      if (res.ok) {
        setSites(data.sites);
        setTotalCount(data.count);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })()
      .catch((error) =>
        alert({ type: "danger", title: "Error !", text: error.message })
      )
      .finally(() => setLoading(false));
  }, [alert, limit, page, setLoading]);

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
            <h3 className="card-title">All Websites</h3>
            <div className="card-options">
                        <button
                          onClick={() => navigate("/add-site")}
                          className="btn btn-primary "
                        >
                          Add Site
                        </button>
                      </div>
                    </div>
                  </div>

          <Table
            headers={headers}
            rows={rows}
            currentPage={page}
            totalPages={Math.ceil(totalCount / limit)}
            onPageChange={setPage}
            entriesPerPage={limit}
            onEntriesChange={(newLimit) => {
              setLimit(newLimit);
            }}
            totalCount={totalCount}
          />
        </div>
      </div>
  );
}
