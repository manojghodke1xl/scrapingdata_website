import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
// import { convertToCSV } from "../utils/exporter";

export default function EnquiryList() {
  const { alert, setLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1000);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/enquiries?p=${page}&n=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        }
      );
      const { data, error } = await res.json();
      if (res.ok) {
        setEnquiries(data.enquiries);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })()
      .catch((error) =>
        alert({ type: "danger", title: "Error !", text: error.message })
      )
      .finally(() => setLoading(false));
  }, [alert, limit, page, setLoading]);

  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">All Enquiries</h3>
          </div>

          <div className="table-responsive">
            <table className="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th>Customer Mobile</th>
                  <th>Enquiry Service</th>
                  <th>Enquiry Subject</th>
                  <th>Enquiry Message</th>
                  <th>Site Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr>
                    <td>{enq.name}</td>
                    <td>{enq.email}</td>
                    <td>
                      {enq.ccode} {enq.mobile}
                    </td>
                    <td>{enq.service}</td>
                    <td>{enq.subject}</td>
                    <td>{enq.site.name}</td>

                    <td className="text-end">
                      <div className="col-6 col-sm-4 col-md-2 col-xl py-3">
                        <button
                          onClick={() => navigate(`/enquiry/${enq._id}`)}
                          className="btn btn-primary w-100"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="card-footer d-flex align-items-center">
            <p className="m-0 text-secondary">
              Showing <span>1</span> to <span>8</span> of <span>16</span>{" "}
              entries
            </p>
            <ul className="pagination m-0 ms-auto">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="#"
                  tabIndex={-1}
                  aria-disabled="true"
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
                    <path d="M15 6l-6 6l6 6" />
                  </svg>
                  prev
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  next{" "}
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
                    <path d="M9 6l6 6l-6 6" />
                  </svg>
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}
