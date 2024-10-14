import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function SignIn() {

  const navigate = useNavigate();
  const { alert, dispatch, setLoading } = useContext(GlobalContext);

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const { data, error } = await res.json();
      if (res.ok) {
        dispatch({ type: "SIGNIN", payload: data.token });
        navigate("/dashboard");
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
    <div className="container container-normal py-4">
      <div className="row align-items-center g-4">
        <div className="col-lg">
          <div className="container-tight">
            <div className="card card-md">
              <div className="card-body">
                <h2 className="h2 text-center mb-4">Admin Login</h2>
                <form onSubmit={loginAccount} autoComplete="off">
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="your@email.com"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Password</label>
                    <div className="input-group input-group-flat">
                      <input
                        type={show ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Your password"
                        autoComplete="off"
                        required
                      />
                      <span className="input-group-text">
                        <Link
                          tabIndex={-1}
                          onClick={() => setShow((s) => !s)}
                          className="link-secondary ms-1"
                          data-bs-toggle="tooltip"
                          aria-label="Show password"
                          data-bs-original-title="Show password"
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
                            <circle cx={12} cy={12} r={2} />
                            <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                          </svg>
                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className="form-footer">
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg d-none d-lg-block"></div>
      </div>
    </div>
  );
}
