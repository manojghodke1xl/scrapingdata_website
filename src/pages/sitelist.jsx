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
        `${import.meta.env.VITE_API_URL}/sites?p=${page}&n=${limit}`,
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
    { label: "Site Key" },
    { label: "Website Name" },
    { label: "Web Address" },
    { label: "Actions" },
  ];

  const rows = sites.map((site) => [
    site._id,
    site.name,
    site.host,
    <button
      onClick={() => navigate(`/edit-site/${site._id}`)}
      className="btn btn-primary w-100"
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
              <div className="page-header d-print-none">
                <div className="container-xl">
                  <div className="row g-2 align-items-center">
                    <div className="col-auto ms-auto d-print-none">
                      <div className="btn-list">
                        <button
                          onClick={() => navigate("/add-site")}
                          className="btn btn-primary d-none d-sm-inline-block"
                          data-bs-toggle="modal"
                          data-bs-target="#modal-report"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                          </svg>
                          Add Site
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Table
            headers={headers}
            rows={rows}
            currentPage={page-1}
            totalPages={Math.ceil(sites.length / limit)}
            onPageChange={setPage}
            entriesPerPage={limit}
            onEntriesChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
            totalCount={totalCount}
          />
        </div>
      </div>
    </div>
  );
}
