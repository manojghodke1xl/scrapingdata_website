import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <div className="page-wrapper">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
