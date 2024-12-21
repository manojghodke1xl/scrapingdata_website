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
          <Link to="/">MarsCMS</Link>
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
                  <li
                    className={`nav-item dropdown ${
                      isActive("/enquiry-list", "/enquiry", "/mailing-list", "/mailing", "/feedback-list", "/feedback")
                        ? "active"
                        : ""
                    }`}
                  >
                    <a
                      className="nav-link dropdown-toggle show"
                      href="#navbar-layout"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      role="button"
                      aria-expanded="true"
                    >
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/layout-2 */}
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
                          <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Enquiries</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <Link className="dropdown-item" to="/enquiry-list">
                            <span className="nav-link-title">Enquiries</span>
                          </Link>
                          <Link className="dropdown-item" to="/mailing-list">
                            <span className="nav-link-title">Mailing Lists</span>
                          </Link>
                          <Link className="dropdown-item" to="/feedback-list">
                            <span className="nav-link-title">Feedback</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`nav-item dropdown ${
                      isActive(
                        "/guide-list",
                        "/add-guide",
                        "/edit-guide",
                        "/casestudy-list",
                        "/add-casestudy",
                        "/edit-casestudy",
                        "/Testimonial-list",
                        "/add-testimonial",
                        "/edit-testimonial",
                        "/category-list",
                        "/add-category",
                        "/edit-category"
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <a
                      className="nav-link dropdown-toggle show"
                      href="#navbar-layout"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      role="button"
                      aria-expanded="true"
                    >
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/layout-2 */}
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
                          <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Features</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <Link className="dropdown-item" to="/guide-list">
                            <span className="nav-link-title">Guides</span>
                          </Link>
                          <Link className="dropdown-item" to="/casestudy-list">
                            <span className="nav-link-title">Case Study</span>
                          </Link>
                          <Link className="dropdown-item" to="/Testimonial-list">
                            <span className="nav-link-title">Testimonials</span>
                          </Link>
                          <Link className="dropdown-item" to="/category-list">
                            <span className="nav-link-title">Testimonial Categories</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`nav-item dropdown ${
                      isActive("/popup-list", "/add-popup", "/edit-popup", "/site-list", "/add-site", "/edit-site")
                        ? "active"
                        : ""
                    }`}
                  >
                    <a
                      className="nav-link dropdown-toggle show"
                      href="#navbar-layout"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      role="button"
                      aria-expanded="true"
                    >
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/layout-2 */}
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
                          <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Essentials</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <Link className="dropdown-item" to="/popup-list">
                            <span className="nav-link-title">Popups</span>
                          </Link>
                          <Link className="dropdown-item" to="/site-list">
                            <span className="nav-link-title">Websites</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`nav-item dropdown ${
                      isActive(
                        "/admin-list",
                        "/add-admin",
                        "/edit-admin",
                        "/smtp-list",
                        "/add-smtp",
                        "/edit-smtp",
                        "/recaptcha-list",
                        "/add-recaptcha",
                        "/edit-recaptcha",
                        "/coupon-list",
                        "/add-coupon",
                        "/edit-coupon"
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <a
                      className="nav-link dropdown-toggle show"
                      href="#navbar-layout"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      role="button"
                      aria-expanded="true"
                    >
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/layout-2 */}
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
                          <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Admin</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          {auth.isSuperAdmin && (
                            <Link className="dropdown-item" to="/admin-list">
                              <span className="nav-link-title">Admins</span>
                            </Link>
                          )}
                          <Link className="dropdown-item" to="/smtp-list">
                            <span className="nav-link-title">SMTPs</span>
                          </Link>
                          <Link className="dropdown-item" to="/recaptcha-list">
                            <span className="nav-link-title">reCAPTCHA</span>
                          </Link>
                          <Link className="dropdown-item" to="/coupon-list">
                            <span className="nav-link-title">Coupons</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`nav-item dropdown ${
                      isActive(
                        "/faq-category-list",
                        "/add-faq-category",
                        "/edit-faq-category",
                        "/faq-list",
                        "/add-faq",
                        "/edit-faq"
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <a
                      className="nav-link dropdown-toggle show"
                      href="#navbar-layout"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      role="button"
                      aria-expanded="true"
                    >
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/layout-2 */}
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
                          <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Support</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <Link className="dropdown-item" to="/faq-category-list">
                            <span className="nav-link-title">Faq Categories</span>
                          </Link>
                          <Link className="dropdown-item" to="/faq-list">
                            <span className="nav-link-title">Faq</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li
                    className={`nav-item dropdown ${
                      isActive(
                        "/client-logo-list",
                        "/add-client-logo",
                        "/edit-client-logo",
                        "/gallery-list",
                        "/add-gallery",
                        "/edit-gallery",
                        "/partner-logo-list",
                        "/add-partner-logo",
                        "/edit-partner-logo"
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <a
                      className="nav-link dropdown-toggle show"
                      href="#navbar-layout"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      role="button"
                      aria-expanded="true"
                    >
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {/* Download SVG icon from http://tabler-icons.io/i/layout-2 */}
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
                          <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                          <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Extra</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <Link className="dropdown-item" to="/client-logo-list">
                            <span className="nav-link-title">Client Logo</span>
                          </Link>
                          <Link className="dropdown-item" to="/gallery-list">
                            <span className="nav-link-title">Gallery</span>
                          </Link>
                          <Link className="dropdown-item" to="/partner-logo-list">
                            <span className="nav-link-title">Partner Logo</span>
                          </Link>
                        </div>
                      </div>
                    </div>
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
