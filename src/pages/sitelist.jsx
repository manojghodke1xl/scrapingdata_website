import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";
// import { convertToCSV } from "../utils/exporter";

export default function SiteList() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [sites, setSites] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1000);

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
            <h3 className="card-title">All Webistes</h3>
            <div className="card-options">
              <div className="page-header d-print-none">
                <div className="container-xl">
                  <div className="row g-2 align-items-center">
                    <div className="col-auto ms-auto d-print-none">
                      <div className="btn-list">
                        <button
                          onClick={() => {
                            navigate("/add-site");
                          }}
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

          <div className="table-responsive">
            <table className="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th>Site Key</th>
                  <th>Website Name</th>
                  <th>Web Adress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((lst) => (
                  <tr>
                    <td>{lst._id}</td>
                    <td>{lst.name}</td>
                    <td>{lst.host}</td>
                    <td className="text-end">
                      <div className="col-6 col-sm-4 col-md-2 col-xl py-3">
                        <button className="btn btn-primary ">Edit</button>
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
