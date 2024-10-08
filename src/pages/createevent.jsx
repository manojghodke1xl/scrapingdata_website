import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { alert, setLoading } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lastdate, setLastdate] = useState("");
  const [eventdate, setEventdate] = useState("");
  const [hasfood, setHasfood] = useState(false);
  const [bookonce, setBookonce] = useState(false);
  const [variants, setVariants] = useState([{ name: "", price: 0, isLimited: false, minLimit: 0, maxLimit: 0 }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("auth"),
        },
        body: JSON.stringify({ name, description, lastdate, eventdate, hasfood, bookonce, drivelink: "", variants }),
      });
      const { data, error } = await res.json();
      if (res.ok) {
        navigate("/dashboard");
        alert({ type: "success", title: "Success !", text: data });
      } else {
        alert({ type: "warning", title: "Warning !", text: error });
      }
    } catch (error) {
      alert({ type: "danger", title: "Error !", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (prop, value, ix) =>
    setVariants((vari) => vari.map((v, i) => (i === ix ? { ...v, [prop]: value } : v)));

  return (
    <div className="page-body">
      <div className="container container-tight py-4">
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">New Event Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label required">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Event Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label required">Event Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Event Description ..."
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label required">Last Booking Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Last Booking Date"
                  value={lastdate}
                  onChange={(e) => setLastdate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label required">Event Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Event Date"
                  value={eventdate}
                  onChange={(e) => setEventdate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="row">
                  <span className="col">Event Book Once</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={bookonce}
                        onChange={(e) => setBookonce(e.target.checked)}
                      />
                    </label>
                  </span>
                </label>
              </div>
              <div className="mb-3">
                <label className="row">
                  <span className="col">Event Has Food</span>
                  <span className="col-auto">
                    <label className="form-check form-check-single form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={hasfood}
                        onChange={(e) => setHasfood(e.target.checked)}
                      />
                    </label>
                  </span>
                </label>
              </div>
              {variants.map((vari, ix) => (
                <div key={ix} className="card card-sm my-3">
                  <div className="card-header justify-content-between">
                    <strong className="fs-4">Variant {ix + 1}</strong>
                    {ix > 0 && (
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setVariants(variants.filter((_, i) => i !== ix))}
                      />
                    )}
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label required">Display Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Display Name"
                        value={vari.name}
                        onChange={(e) => handleChange("name", e.target.value, ix)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label required">Amount Chargable</label>
                      <input
                        type="number"
                        pattern="\d+"
                        className="form-control"
                        placeholder="Amount Chargable"
                        value={vari.price}
                        onChange={(e) => handleChange("price", e.target.value, ix)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="row">
                        <span className="col">Event Booking Limited</span>
                        <span className="col-auto">
                          <label className="form-check form-check-single form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={vari.isLimited}
                              onChange={(e) => handleChange("isLimited", e.target.checked, ix)}
                            />
                          </label>
                        </span>
                      </label>
                    </div>
                    {vari.isLimited && (
                      <>
                        <div className="mb-3">
                          <label className="form-label required">Event Booking Min</label>
                          <input
                            type="number"
                            pattern="\d+"
                            className="form-control"
                            placeholder="Minimum Booking"
                            value={vari.minLimit}
                            onChange={(e) => handleChange("minLimit", e.target.value, ix)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label required">Event Booking Max</label>
                          <input
                            type="number"
                            pattern="\d+"
                            className="form-control"
                            placeholder="Maximum Booking"
                            value={vari.maxLimit}
                            onChange={(e) => handleChange("maxLimit", e.target.value, ix)}
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div className="mt-3 text-center">
                <button
                  type="button"
                  className="btn btn-azure btn-icon"
                  onClick={() =>
                    setVariants(variants.concat({ name: "", price: 0, isLimited: false, minLimit: 0, maxLimit: 0 }))
                  }
                >
                  <svg
                    className="icon"
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
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                </button>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
