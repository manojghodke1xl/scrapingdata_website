import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table";

export default function TestimonialList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [smtps, setSmtps] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/smtps?p=${page - 1}&n=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );

      const { data, error } = await res.json();
      if (res.ok) {
        setSmtps(data.smtps);
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

  const headers = [{ label: "Name" }, { label: "Host" }, { label: "Actions" }];

  const rows = smtps.map((smtp) => [
    smtp.name,
    smtp.host,
    <div className="d-flex justify-content-between" key={smtp._id}>
      <button
        onClick={() => navigate(`/add-smtp/${smtp._id}`)}
        className="btn btn-primary me-2"
      >
        Edit
      </button>
    </div>,
  ]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All SMTPs List</h3>
            <div className="card-options">
              <button
                onClick={() => navigate("/add-smtp")}
                className="btn btn-primary"
              >
                Add SMTP
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
