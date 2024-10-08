import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

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
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <Link to="/">
            <img src="/logo.jpg" alt="Logo" className="navbar-brand-image" width={110} height={32} />
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
                          strokeLinejoin="round">
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
                    <Link className="nav-link" to="/member-list">
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
                          strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                      </span>
                      <span className="nav-link-title">All Members</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/event-list">
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
                          strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                      </span>
                      <span className="nav-link-title">All Events</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/create-event">
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
                          strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                      </span>
                      <span className="nav-link-title">New Event</span>
                    </Link>
                  </li>
                  {/* <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#navbar-base"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      role="button"
                      aria-expanded="false">
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
                          strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                          <path d="M12 12l8 -4.5" />
                          <path d="M12 12l0 9" />
                          <path d="M12 12l-8 -4.5" />
                          <path d="M16 5.25l-8 4.5" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Interface</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <a className="dropdown-item" href="./empty.html">
                            Empty page
                          </a>
                          <a className="dropdown-item" href="./accordion.html">
                            Accordion
                          </a>
                          <a className="dropdown-item" href="./blank.html">
                            Blank page
                          </a>
                          <a className="dropdown-item" href="./badges.html">
                            Badges
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="./buttons.html">
                            Buttons
                          </a>
                          <div className="dropend">
                            <a
                              className="dropdown-item dropdown-toggle"
                              href="#sidebar-cards"
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="outside"
                              role="button"
                              aria-expanded="false">
                              Cards
                              <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                            </a>
                            <div className="dropdown-menu">
                              <a href="./cards.html" className="dropdown-item">
                                Sample cards
                              </a>
                              <a href="./card-actions.html" className="dropdown-item">
                                Card actions
                                <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                              </a>
                              <a href="./cards-masonry.html" className="dropdown-item">
                                Cards Masonry
                              </a>
                            </div>
                          </div>
                          <a className="dropdown-item" href="./colors.html">
                            Colors
                          </a>
                          <a className="dropdown-item" href="./datagrid.html">
                            Data grid
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="./datatables.html">
                            Datatables
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="./dropdowns.html">
                            Dropdowns
                          </a>
                          <a className="dropdown-item" href="./modals.html">
                            Modals
                          </a>
                          <a className="dropdown-item" href="./maps.html">
                            Maps
                          </a>
                          <a className="dropdown-item" href="./map-fullsize.html">
                            Map fullsize
                          </a>
                          <a className="dropdown-item" href="./maps-vector.html">
                            Vector maps
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="./navigation.html">
                            Navigation
                          </a>
                          <a className="dropdown-item" href="./charts.html">
                            Charts
                          </a>
                        </div>
                        <div className="dropdown-menu-column">
                          <a className="dropdown-item" href="./pagination.html">
                            Pagination
                          </a>
                          <a className="dropdown-item" href="./placeholder.html">
                            Placeholder
                          </a>
                          <a className="dropdown-item" href="./steps.html">
                            Steps
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="./tabs.html">
                            Tabs
                          </a>
                          <a className="dropdown-item" href="./tables.html">
                            Tables
                          </a>
                          <a className="dropdown-item" href="./carousel.html">
                            Carousel
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="./lists.html">
                            Lists
                          </a>
                          <a className="dropdown-item" href="./typography.html">
                            Typography
                          </a>
                          <a className="dropdown-item" href="./offcanvas.html">
                            Offcanvas
                          </a>
                          <a className="dropdown-item" href="./markdown.html">
                            Markdown
                          </a>
                          <a className="dropdown-item" href="./dropzone.html">
                            Dropzone
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="./lightbox.html">
                            Lightbox
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="./tinymce.html">
                            TinyMCE
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <a className="dropdown-item" href="./inline-player.html">
                            Inline player
                            <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">New</span>
                          </a>
                          <div className="dropend">
                            <a
                              className="dropdown-item dropdown-toggle"
                              href="#sidebar-authentication"
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="outside"
                              role="button"
                              aria-expanded="false">
                              Authentication
                            </a>
                            <div className="dropdown-menu">
                              <a href="./sign-in.html" className="dropdown-item">
                                Sign in
                              </a>
                              <a href="./sign-in-link.html" className="dropdown-item">
                                Sign in link
                              </a>
                              <a href="./sign-in-illustration.html" className="dropdown-item">
                                Sign in with illustration
                              </a>
                              <a href="./sign-in-cover.html" className="dropdown-item">
                                Sign in with cover
                              </a>
                              <a href="./sign-up.html" className="dropdown-item">
                                Sign up
                              </a>
                              <a href="./forgot-password.html" className="dropdown-item">
                                Forgot password
                              </a>
                              <a href="./terms-of-service.html" className="dropdown-item">
                                Terms of service
                              </a>
                              <a href="./auth-lock.html" className="dropdown-item">
                                Lock screen
                              </a>
                            </div>
                          </div>
                          <div className="dropend">
                            <a
                              className="dropdown-item dropdown-toggle"
                              href="#sidebar-error"
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="outside"
                              role="button"
                              aria-expanded="false">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-inline me-1"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                <path d="M9 14l6 0" />
                              </svg>
                              Error pages
                            </a>
                            <div className="dropdown-menu">
                              <a href="./error-404.html" className="dropdown-item">
                                404 page
                              </a>
                              <a href="./error-500.html" className="dropdown-item">
                                500 page
                              </a>
                              <a href="./error-maintenance.html" className="dropdown-item">
                                Maintenance page
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="btn-list">
              <button className="btn" onClick={() => dispatch({ type: 'SIGNOUT' })}>
                Log Out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
