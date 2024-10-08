import { Link } from 'react-router-dom';

export default function AlldoneForm() {
  return (
    <div className="card-body text-center">
      <div className="text-uppercase text-muted font-weight-medium">All Details Saved</div>
      <div className="display-5 fw-bold my-3">Thank You !</div>

      <div className="text-center mt-4">
        <Link to="/dash" className="btn btn-primary">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
