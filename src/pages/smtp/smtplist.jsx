import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../../comps/table";
import useSetTimeout from "../../Hooks/useDebounce";

export default function SmtpList() {
  const navigate = useNavigate();
  const { alert } = useContext(GlobalContext);

  const [smtps, setSmtps] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const searchAbleKeys = ["Name", "Host"];

  const [err, data] = useSetTimeout("smtps", page - 1, limit, searchTerm, searchKey);

  useEffect(() => {
    if (data) {
      setSmtps(data.smtps);
      setTotalCount(data.count);
    } else if (err) {
      alert({ type: "warning", text: err.message });
    }
  }, [data, err, alert]);

  const headers = [{ label: "Name" }, { label: "Host" }, { label: "Actions" }];

  const rows = smtps.map((smtp,index) => [
    smtp.name,
    smtp.host,
    <button key={index} onClick={() => navigate(`/edit-smtp/${smtp._id}`)} className="btn btn-primary ">
      Edit
    </button>,
  ]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All SMTPs List</h3>
            <div className="card-options">
              <button onClick={() => navigate("/add-smtp")} className="btn btn-primary">
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
