import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import Table from "../comps/table"; 

export default function MailingList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [lists, setLists] = useState([]);
  const [page, setPage] = useState(1); 
  const [limit, setLimit] = useState(8); 

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/lists?p=${page}&n=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );
      const { data, error } = await res.json();
      if (res.ok) {
        setLists(data.lists);
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
    { label: "Customer Email" },
    { label: "Site Name" },
    { label: "Actions" },
  ];

  const rows = lists.map((lst) => [
    lst.email,
    lst.site.name,
    <button
      onClick={() => navigate(`/mailing/${lst._id}`)}
      className="btn btn-primary w-100"
    >
      View
    </button>,
  ]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleLimitChange = (newLimit) => setLimit(newLimit);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Mailing Lists</h3>
          </div>

          <div className="table-responsive">
            <Table
              headers={headers}        
              rows={rows}               
              currentPage={page}         
              totalPages={Math.ceil(lists.length / limit)} 
              onPageChange={handlePageChange} 
              entriesPerPage={limit}     
              onEntriesChange={handleLimitChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
