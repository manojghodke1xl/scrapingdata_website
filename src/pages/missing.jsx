import { Link } from 'react-router-dom';

export default function Missing() {
  return (
    <div className="container-tight py-4">
      <div className="empty">
        <div className="empty-header">404</div>
        <p className="empty-title">Oops… You just found an error page</p>
        <p className="empty-subtitle text-muted">We are sorry but the page you are looking for was not found</p>
        <div className="empty-action">
          <Link to="/" className="btn btn-primary">
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
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
            Take me Home
          </Link>
        </div>
      </div>
    </div>
  );
}
