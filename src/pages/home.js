import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-body">
      <div className="container-xl d-flex flex-column justify-content-center">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col text-center">
                <Link to="/signin" className="btn btn-success">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
