import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { Link } from "react-router-dom";
// import { convertToCSV } from "../utils/exporter";

export default function MemberList() {
  const { alert, setLoading } = useContext(GlobalContext);

  const [members, setMembers] = useState([]);
  const [did, setDid] = useState(0);

  useEffect(() => {
    if (did > 0) return;
    setLoading(true);
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/member`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        setMembers(data);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })()
      .catch((error) => alert({ type: "danger", title: "Error !", text: error.message }))
      .finally(() => setLoading(false));
  }, [alert, did, setLoading]);

  const deleteMember = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/member/delete/${did}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        alert({ type: "success", title: "Success !", text: data });
        setDid(0);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error !", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const exportMembers = () => {
    // const a = document.createElement("a");
    // a.download = "MemberExport.csv";
    // a.href = `data:text/csv,${encodeURIComponent(convertToCSV(members))}`;
    // a.click();
  };

  return (
    <>
      <div className="page-body">
        <div className="container-xl">
          <div className="d-flex justify-content-center pb-3">
            <button className="btn btn-primary" onClick={exportMembers} disabled={members.length === 0}>
              Export All
            </button>
          </div>
          <div className="card">
            <div className="table-responsive">
              <table className="table table-vcenter card-table table-striped">
                <thead>
                  <tr>
                    <th>Account Details</th>
                    <th>Personal Details</th>
                    <th>Spouse Details</th>
                    <th>Children Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <ul className="list-unstyled lh-lg">
                          <li className="text-capitalize">Name: {m.name}</li>
                          <li>Email: {m.email}</li>
                        </ul>
                      </td>
                      <td>
                        {Boolean(m.detail) && (
                          <ul className="list-unstyled lh-lg">
                            <li className="text-capitalize">First Name: {m.detail.firstname}</li>
                            <li className="text-capitalize">Last Name: {m.detail.lastname}</li>
                            <li>Date Of Birth: {m.detail.dateofbirth}</li>
                            <li>Whatsapp: {m.detail.mobilenumber}</li>
                            <li>Email: {m.detail.emailaddress}</li>
                            <li>Married: {m.detail.ismarried ? "Yes" : "No"}</li>
                          </ul>
                        )}
                      </td>
                      <td>
                        {Boolean(m.spouse) && (
                          <ul className="list-unstyled lh-lg">
                            <li className="text-capitalize">First Name: {m.spouse.firstname}</li>
                            <li>Date Of Birth: {m.spouse.dateofbirth}</li>
                            <li>Whatsapp: {m.spouse.mobilenumber}</li>
                            <li>Children: {m.spouse.haschildren ? "Yes" : "No"}</li>
                          </ul>
                        )}
                      </td>
                      <td>
                        {m.children.length > 0 && (
                          <ul className="list-unstyled lh-lg">
                            {m.children.map((child) => (
                              <li key={child.id} className="text-capitalize">
                                {child.firstname} - {child.dateofbirth}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td>
                        <Link className="btn btn-primary mx-1" to={`/edit-member/${m.id}`}>
                          Edit
                        </Link>
                        <span
                          onClick={() => setDid(m.id)}
                          className="btn btn-danger mx-1"
                          data-bs-toggle="modal"
                          data-bs-target="#modal"
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="modal" tabIndex="-1" className="modal modal-blur fade hide" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            <div className="modal-status bg-danger" />
            <div className="modal-body text-center py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon mb-2 text-danger icon-lg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 9v2m0 4v.01" />
                <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
              </svg>
              <h3>Are you sure?</h3>
              <div className="text-muted">
                Do you really want to delete the member? Once deleted cannot be recovered.
              </div>
            </div>
            <div className="modal-footer">
              <div className="w-100">
                <div className="row">
                  <div className="col">
                    <span className="btn w-100" data-bs-dismiss="modal">
                      Cancel
                    </span>
                  </div>
                  <div className="col">
                    <span onClick={deleteMember} className="btn btn-danger w-100" data-bs-dismiss="modal">
                      Delete Member
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
