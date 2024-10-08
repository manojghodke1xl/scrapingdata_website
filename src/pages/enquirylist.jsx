import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
// import { convertToCSV } from "../utils/exporter";

export default function EnquiryList() {
  const { alert, setLoading } = useContext(GlobalContext);

  const [enquiries, setEnquiries] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/enquiries?p=${page}&n=${limit}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        setEnquiries(data.enquiries);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })()
      .catch((error) => alert({ type: "danger", title: "Error !", text: error.message }))
      .finally(() => setLoading(false));
  }, [alert, limit, page, setLoading]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Enquiries</h3>
          </div>
          <div className="list-group list-group-flush">
            {enquiries.map((enq) => (
              <span key={enq._id} className="list-group-item list-group-item-action">
                {JSON.stringify(enq)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
