import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function Header({ isAuth = false }) {
  const { dispatch } = useContext(GlobalContext);
  return (
    <header className="navbar navbar-expand-md navbar-light d-print-none">
      <div className="container-xl">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-menu"
          aria-controls="navbar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <Link to="/">
            Vista Group
            {/* <img src="/logo.jpg" alt="Logo" className="navbar-brand-image" width={110} height={32} /> */}
          </Link>
        </h1>
        {isAuth && (
          <>
            <div className="collapse navbar-collapse" id="navbar-menu">
              <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
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
                          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/enquiry-list">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
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
                          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                      </span>
                      <span className="nav-link-title">All Enquiries</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/mailing-list">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
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
                          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                      </span>
                      <span className="nav-link-title">All Maling Lists</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/site-list">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
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
                          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                      </span>
                      <span className="nav-link-title">All WebSites</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="btn-list">
              <button
                className="btn"
                onClick={() => dispatch({ type: "SIGNOUT" })}
              >
                Log Out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
