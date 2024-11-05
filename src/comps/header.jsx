import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function Header() {
  const { auth, dispatch } = useContext(GlobalContext);
  const location = useLocation(); // Get the current location

  // Helper function to check if a link is active
  const isActive = (...paths) => paths.some((path) => location.pathname.startsWith(path));

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
          <Link to="/">Vista Group</Link>
        </h1>
        {!!auth.id && (
          <>
            <div className="collapse navbar-collapse" id="navbar-menu">
              <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                <ul className="navbar-nav">
                  <li className={`nav-item ${isActive("/dashboard") ? "active" : ""}`}>
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
                  <li className={`nav-item ${isActive("/enquiry-list", "/enquiry") ? "active" : ""}`}>
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
                      <span className="nav-link-title">Enquiries</span>
                    </Link>
                  </li>
                  <li className={`nav-item ${isActive("/mailing-list", "/mailing") ? "active" : ""}`}>
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
                      <span className="nav-link-title">Mailing Lists</span>
                    </Link>
                  </li>
                  {auth.isSuperAdmin && (
                    <li className={`nav-item ${isActive("/admin-list", "/add-admin", "/edit-admin") ? "active" : ""}`}>
                      <Link className="nav-link" to="/admin-list">
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
                        <span className="nav-link-title">Admins</span>
                      </Link>
                    </li>
                  )}
                  <li className={`nav-item ${isActive("/guide-list", "/add-guide", "/edit-guide") ? "active" : ""}`}>
                    <Link className="nav-link" to="/guide-list">
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
                      <span className="nav-link-title">Guides</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      isActive("/casestudy-list", "/add-casestudy", "/edit-casestudy") ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/casestudy-list">
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
                      <span className="nav-link-title">Case Study</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      isActive("/Testimonial-list", "/add-testimonial", "/edit-testimonial") ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/Testimonial-list">
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
                      <span className="nav-link-title">Testimonials</span>
                    </Link>
                  </li>
                  <li className={`nav-item ${isActive("/smtp-list", "/add-smtp", "/edit-smtp") ? "active" : ""}`}>
                    <Link className="nav-link" to="/smtp-list">
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
                      <span className="nav-link-title">SMTPs</span>
                    </Link>
                  </li>
                  <li className={`nav-item ${isActive("/popup-list", "/add-popup", "/edit-popup") ? "active" : ""}`}>
                    <Link className="nav-link" to="/popup-list">
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
                      <span className="nav-link-title">Popups</span>
                    </Link>
                  </li>
                  <li
                    className={`nav-item ${
                      isActive("/category-list", "/add-category", "/edit-category") ? "active" : ""
                    }`}
                  >
                    <Link className="nav-link" to="/category-list">
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
                      <span className="nav-link-title">Categories</span>
                    </Link>
                  </li>
                  <li className={`nav-item ${isActive("/site-list", "/add-site", "/edit-site") ? "active" : ""}`}>
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
                      <span className="nav-link-title">Websites</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="btn-list">
              <button className="btn" onClick={() => dispatch({ type: "SIGNOUT" })}>
                Log Out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
