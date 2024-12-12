import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer footer-transparent d-print-none">
      <div className="container-xl">
        <div className="row text-center align-items-center flex-row-reverse">
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                Copyright © {new Date().getFullYear()}{" "}
                <Link to="." className="link-secondary">
                  | MarsCMS
                </Link>{" "}
                | All Rights Reserved.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
