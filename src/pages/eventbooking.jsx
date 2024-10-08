import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useParams } from "react-router-dom";
// import { convertToCSV } from "../utils/exporter";
// import { utils, writeFile } from 'xlsx';

export default function EventBooking() {
  const { eid } = useParams();

  const { alert, setLoading } = useContext(GlobalContext);

  const [bookings, setBookings] = useState([]);
  const [did, setDid] = useState(0);

  useEffect(() => {
    if (did > 0) return;
    setLoading(true);
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/event/booking/${eid}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        setBookings(data);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })()
      .catch((error) => alert({ type: "danger", title: "Error !", text: error.message }))
      .finally(() => setLoading(false));
  }, [alert, eid, did, setLoading]);

  const deleteBooking = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/event/booking/${did}`, {
        method: "DELETE",
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

  const exportEvents = () => {
    // const a = document.createElement("a");
    // a.download = "EventExport.csv";
    // a.href = `data:text/csv,${encodeURIComponent(convertToCSV(bookings))}`;
    // a.click();
  };

  return (
    <>
      <div className="page-body">
        <div className="container-xl">
          <div className="d-flex justify-content-center pb-3">
            <button className="btn btn-primary" onClick={exportEvents} disabled={bookings.length === 0}>
              Export Event
            </button>
          </div>
          <div className="row row-cards">
            {bookings.map((b) => (
              <div key={b.id} className="col-md-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <ul className="list-unstyled lh-lg">
                      <li className="text-capitalize">First Name: {b.account.detail.firstname}</li>
                      <li className="text-capitalize">Last Name: {b.account.detail.lastname}</li>
                      <li>Whatsapp: {b.account.detail.mobilenumber}</li>
                      <li>Email: {b.account.detail.emailaddress}</li>
                      {Boolean(b.food) && <li>Food Preference: {b.food} food</li>}
                    </ul>
                    <h3 className="card-title text-bold">
                      Total: <span className="text-decoration-underline">₹{b.total}</span>
                    </h3>
                    <ul className="list-unstyled lh-lg">
                      {b.components.map((c) => (
                        <li key={c.id} className="list-group-item">
                          {c.name}: ₹{c.price} x {c.qty}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-around">
                      <button
                        onClick={() => setDid(b.id)}
                        className="btn btn-danger mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#modal"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                Do you really want to delete the booking? Once deleted cannot be recovered.
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
                    <span onClick={deleteBooking} className="btn btn-danger w-100" data-bs-dismiss="modal">
                      Delete Booking
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
