import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { Link } from "react-router-dom";

export default function EventList() {
  const { alert, setLoading } = useContext(GlobalContext);

  const [events, setEvents] = useState([]);
  const [did, setDid] = useState(0);

  useEffect(() => {
    if (did > 0) return;
    setLoading(true);
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/event`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("auth"),
        },
      });
      const { data, error } = await res.json();
      if (res.ok) {
        setEvents(data);
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    })()
      .catch((error) => alert({ type: "danger", title: "Error !", text: error.message }))
      .finally(() => setLoading(false));
  }, [alert, did, setLoading]);

  const deleteEvent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/event/edit/${did}`, {
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

  return (
    <>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            {events.map((e) => (
              <div key={e.id} className="col-md-6 col-lg-3">
                <div className="card">
                  <div className="ribbon bg-azure">{e.reservations.length}</div>
                  <div className="card-body">
                    <h3 className="card-title text-bold text-capitalize text-decoration-underline">{e.name}</h3>
                    <ul className="list-unstyled lh-lg">
                      <li>Event Date: {e.eventdate}</li>
                      <li>Last Booking Date: {e.lastdate}</li>
                      <li>Booking: {e.bookonce ? "Once" : "Multiple"}</li>
                      <li>Type: {e.hasfood ? "" : "Non "}Food Event</li>
                    </ul>
                    <ul className="list-unstyled lh-lg mt-3">
                      <EventSums reservations={e.reservations} />
                    </ul>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-around">
                      <button
                        onClick={() => setDid(e.id)}
                        className="btn btn-danger mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#modal"
                      >
                        Delete
                      </button>
                      <Link to={`/edit-event/${e.id}`} className="btn btn-primary">
                        Edit
                      </Link>
                      <Link to={`/event-booking/${e.id}`} className="btn btn-success">
                        Bookings
                      </Link>
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
                Do you really want to delete the event? Once deleted cannot be recovered.
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
                    <span onClick={deleteEvent} className="btn btn-danger w-100" data-bs-dismiss="modal">
                      Delete Event
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
function EventSums({ reservations }) {
  const ac = reservations.reduce((ac, { components }) => {
    components.forEach(({ qty, name }) => (ac[name] = qty + (ac[name] ?? 0)));
    return ac;
  }, {});

  return Object.keys(ac).map((key) => (
    <li key={key}>
      Total {key}: {ac[key]}
    </li>
  ));
}
